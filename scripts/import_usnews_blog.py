#!/usr/bin/env python3
"""Import Dr. Martin Tibuakuu's U.S. News patient-advice articles into blog_posts.

Reads article metadata from lib/usnews-blog-posts.ts seed data and upserts
published posts into Supabase when SUPABASE_SERVICE_ROLE_KEY is set.

Usage:
  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python3 scripts/import_usnews_blog.py
"""

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEED_TS = ROOT / "lib" / "usnews-blog-posts.ts"

# Article URLs from https://www.usnews.com/topics/author/martin-tibuakuu-md
ARTICLE_URLS = [
    "https://health.usnews.com/health-news/patient-advice/articles/2016-09-22/electronic-cigarettes-are-they-safer-than-traditional-cigarettes",
    "https://health.usnews.com/health-news/patient-advice/articles/2016-08-24/know-your-a1c-what-this-blood-test-can-tell-you-about-your-risk-for-diabetes-and-cardiovascular-disease",
]

HEADINGS_BY_SLUG = {
    "electronic-cigarettes-are-they-safer-than-traditional-cigarettes": [
        "What Are E-Cigs?",
        "How Do E-Cigs Work?",
        "Are E-Cigs Safer Than Traditional Cigarettes?",
        "Are E-Cigs Effective for Quitting Smoking?",
        "What Is the Chance That My Child Will Use E-Cigs?",
        "It Seems There Are Risks With E-Cig Use. How Are They Regulated?",
        "I Was Thinking of Quitting With E-Cigs. What Should I Do Now?",
    ],
    "know-your-a1c-what-this-blood-test-can-tell-you-about-your-risk-for-diabetes-and-cardiovascular-disease": [
        "Type 2 Diabetes: Who Is at Risk?",
        "What Is Prediabetes?",
        "What Is the A1C Blood Test?",
        "How Does an A1C Test Differ From a Blood Glucose Level?",
        "How Do We Diagnose Diabetes and Prediabetes?",
        "What Are the A1C Criteria for Diabetes and Prediabetes Diagnosis?",
        "What Is the Target A1C Level?",
        "What Are the Benefits of Lowering A1C?",
        "Who Should Get an A1C Test?",
        "What Are the Limitations to A1C Testing for Diabetes?",
        "What Can You Do to Protect Yourself From Diabetes?",
    ],
}


def fetch_json_ld(url: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    for block in re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.S
    ):
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            continue
        if isinstance(data, dict) and data.get("@type") == "NewsArticle":
            return data
    raise RuntimeError(f"No NewsArticle JSON-LD found at {url}")


def slug_from_url(url: str) -> str:
    return url.rstrip("/").split("/")[-1]


def body_to_markdown(body: str, slug: str) -> str:
    text = body.replace("[See:", "\n\n[See:").replace("] ", "] ")
    headings = HEADINGS_BY_SLUG.get(slug, [])
    for heading in sorted(headings, key=len, reverse=True):
        text = text.replace(heading, f"\n\n## {heading}\n\n")

    # Bullet lists introduced with • in A1C article
    text = text.replace("•", "\n- ")
    text = re.sub(r"\n- Have ", "\n- Have ", text)

    # A1C table block -> markdown table
    text = re.sub(
        r"A1C\s+Percentage\s+Normal\s+Below 5\.7%\s+Prediabetes\s+5\.7%–6\.4%\s+Diabetes\s+6\.5% or greater",
        (
            "| A1C | Percentage |\n| --- | --- |\n"
            "| Normal | Below 5.7% |\n"
            "| Prediabetes | 5.7%–6.4% |\n"
            "| Diabetes | 6.5% or greater |"
        ),
        text,
    )

    # E-cig component list
    text = text.replace(
        "A cartridge, which holds",
        "\n- A cartridge, which holds",
    )
    text = text.replace(
        "A heating device that vaporizes",
        "\n- A heating device that vaporizes",
    )
    text = text.replace(
        "A power source (usually a battery)",
        "\n- A power source (usually a battery)",
    )

    # Split into readable paragraphs
    chunks = re.split(r"\n\n+", text.strip())
    paragraphs: list[str] = []
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
        if chunk.startswith("## ") or chunk.startswith("| ") or chunk.startswith("- "):
            paragraphs.append(chunk)
            continue
        sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z\"'])", chunk)
        buf: list[str] = []
        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
            buf.append(sentence)
            if len(" ".join(buf)) > 420:
                paragraphs.append(" ".join(buf))
                buf = []
        if buf:
            paragraphs.append(" ".join(buf))

    return "\n\n".join(paragraphs)


def build_post(article: dict, source_url: str) -> dict:
    slug = slug_from_url(source_url)
    title = article["headline"].strip()
    excerpt = (article.get("description") or "").strip()
    published = article.get("datePublished", "")[:10]
    image = article.get("image", {})
    cover = image.get("url") if isinstance(image, dict) else None
    authors = article.get("author") or []
    author_names = ", ".join(a.get("name", "").strip() for a in authors if a.get("name"))
    body_md = body_to_markdown(article["articleBody"], slug)

    attribution = (
        f"\n\n---\n\n"
        f"*Originally published on [U.S. News & World Report]({source_url})"
        f"{f' by {author_names}' if author_names else ''}. "
        f"Republished on PulsePoint Journal for patient education.*"
    )

    tags = ["preventive cardiology", "patient education", "us-news"]
    keywords = article.get("keywords") or []
    for kw in keywords:
        kw = str(kw).strip().lower()
        if kw in {"diabetes", "prediabetes", "heart health", "heart disease", "vaping", "smoking and tobacco"}:
            tags.append(kw.replace(" ", "-"))

    return {
        "slug": slug,
        "title": title,
        "excerpt": excerpt[:400],
        "body_md": body_md + attribution,
        "cover_image_url": cover,
        "author": "Martin Tibuakuu, MD, MPH, FACC",
        "tags": sorted(set(tags)),
        "is_published": True,
        "published_at": f"{published}T12:00:00.000Z",
        "source_url": source_url,
    }


def upsert_supabase(posts: list[dict]) -> None:
    url = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        print("Skipping Supabase upsert (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set).")
        return

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=representation",
    }

    for post in posts:
        payload = {k: v for k, v in post.items() if k != "source_url"}
        req = urllib.request.Request(
            f"{url.rstrip('/')}/rest/v1/blog_posts?on_conflict=slug",
            data=json.dumps(payload).encode(),
            headers={**headers, "Prefer": "resolution=merge-duplicates,return=representation"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode())
            print(f"  [ok] upserted {post['slug']}")
        except urllib.error.HTTPError as e:
            print(f"  [fail] {post['slug']}: {e.code} {e.read().decode()[:300]}")
            raise


def write_seed_ts(posts: list[dict]) -> None:
    """Write lib/usnews-blog-posts.ts for static blog fallback."""
    def esc(s: str) -> str:
        return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    entries = []
    for p in posts:
        tags = json.dumps(p["tags"])
        entries.append(
            "  {\n"
            f"    slug: '{p['slug']}',\n"
            f"    title: {json.dumps(p['title'])},\n"
            f"    excerpt: {json.dumps(p['excerpt'])},\n"
            f"    body_md: `{esc(p['body_md'])}`,\n"
            f"    cover_image_url: {json.dumps(p['cover_image_url'])},\n"
            f"    author: {json.dumps(p['author'])},\n"
            f"    tags: {tags},\n"
            f"    is_published: true,\n"
            f"    published_at: '{p['published_at']}',\n"
            f"    source_url: {json.dumps(p['source_url'])},\n"
            "  }"
        )

    content = (
        "import type { BlogPost } from '@/lib/blog'\n\n"
        "// Dr. Martin Tibuakuu's U.S. News patient-advice articles.\n"
        "// Generated by scripts/import_usnews_blog.py — do not edit by hand.\n"
        "export const USNEWS_BLOG_POSTS: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>[] = [\n"
        + ",\n".join(entries)
        + ",\n]\n"
    )
    SEED_TS.write_text(content, encoding="utf-8")
    print(f"Wrote {SEED_TS.relative_to(ROOT)}")


def main() -> None:
    posts: list[dict] = []
    for url in ARTICLE_URLS:
        slug = slug_from_url(url)
        print(f"Fetching {slug}...")
        article = fetch_json_ld(url)
        posts.append(build_post(article, url))

    write_seed_ts(posts)
    upsert_supabase(posts)
    print(f"\nDone: {len(posts)} articles prepared.")


if __name__ == "__main__":
    main()
