#!/usr/bin/env python3
"""Generate diagnostic-service card images via fal.ai (FLUX).

The FAL key is read from the FAL_KEY environment variable only. Never hardcode
or commit the key. Run:  FAL_KEY=xxxx python3 scripts/gen_diagnostics_images.py

Images are written to public/assets/diagnostics/<slug>.png so the Diagnostics
page can reference them directly. Re-running regenerates every image.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

FAL_KEY = os.environ.get("FAL_KEY")
if not FAL_KEY:
    sys.exit("FAL_KEY env var is required (do not hardcode the key).")

# flux/dev = strong photorealism at a reasonable cost. landscape_4_3 matches the
# card's wide image tile. Safety checker disabled so legitimate clinical body
# shots (e.g. chest patch monitors) are not falsely blanked.
MODEL_ENDPOINT = "https://fal.run/fal-ai/flux/dev"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "assets" / "diagnostics"

# A shared style suffix keeps the 10 cards visually consistent and on-brand.
STYLE = (
    "professional medical photography, bright clean modern outpatient cardiology "
    "clinic, premium, soft natural lighting, shallow depth of field, high detail, "
    "no text, no letters, no words, no watermark, no logo"
)

SERVICES = [
    (
        "ecg",
        "Extreme close-up of a printed ECG electrocardiogram paper strip with a "
        "clean heart-rhythm tracing, fine red grid lines on white paper",
    ),
    (
        "echocardiogram-tte",
        "An echocardiogram ultrasound machine monitor glowing with a grayscale "
        "cardiac ultrasound image of a human heart, modern cardiology suite",
    ),
    (
        "stress-echocardiogram",
        "A cardiac stress test room with a medical treadmill positioned beside a "
        "cardiac ultrasound echocardiography machine, clinical equipment",
    ),
    (
        "exercise-stress-ecg",
        "A patient walking on a medical treadmill with ECG monitoring electrodes "
        "and cables attached to the chest, cardiac stress testing in progress",
    ),
    (
        "carotid-ultrasound",
        "A carotid artery ultrasound exam: a clinician holding an ultrasound probe "
        "against a patient's neck, color Doppler vascular image on the screen",
    ),
    (
        "abdominal-aortic-ultrasound",
        "An abdominal ultrasound examination with the ultrasound probe on a "
        "patient's abdomen and a grayscale ultrasound image on the monitor",
    ),
    (
        "peripheral-arterial-doppler",
        "A vascular Doppler ultrasound monitor displaying colorful arterial blood "
        "flow waveforms for a peripheral arterial leg study",
    ),
    (
        "venous-insufficiency-ultrasound",
        "A venous Doppler leg ultrasound: ultrasound probe on a patient's lower "
        "leg with a color blood-flow image on the ultrasound screen",
    ),
    (
        "holter-monitor",
        "A small sleek modern white adhesive wearable cardiac patch biosensor "
        "stuck on a person's upper chest, discreet minimal medical device, clean skin",
    ),
    (
        "extended-cardiac-event-monitoring",
        "A modern minimal adhesive wearable cardiac event monitor patch on a "
        "person's chest, sleek discreet white biosensor, contemporary healthcare",
    ),
]


def generate(slug: str, subject: str) -> bool:
    prompt = f"{subject}, {STYLE}"
    payload = json.dumps(
        {
            "prompt": prompt,
            "image_size": "landscape_4_3",
            "num_images": 1,
            "num_inference_steps": 30,
            "guidance_scale": 3.5,
            "enable_safety_checker": False,
        }
    ).encode()

    req = urllib.request.Request(
        MODEL_ENDPOINT,
        data=payload,
        headers={
            "Authorization": f"Key {FAL_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"  [FAIL] {slug}: HTTP {e.code} {e.read().decode()[:200]}")
        return False
    except Exception as e:  # noqa: BLE001 - report and continue with next image
        print(f"  [FAIL] {slug}: {e}")
        return False

    images = data.get("images") or []
    if not images:
        print(f"  [FAIL] {slug}: no images in response {str(data)[:200]}")
        return False

    url = images[0]["url"]
    dest = OUTPUT_DIR / f"{slug}.png"
    try:
        with urllib.request.urlopen(url, timeout=120) as img_resp:
            dest.write_bytes(img_resp.read())
    except Exception as e:  # noqa: BLE001
        print(f"  [FAIL] {slug}: download error {e}")
        return False

    print(f"  [ok]   {slug} -> {dest.relative_to(OUTPUT_DIR.parent.parent.parent)} "
          f"({dest.stat().st_size // 1024} KB)")
    return True


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Generating {len(SERVICES)} diagnostic images -> {OUTPUT_DIR}")
    ok = 0
    for slug, subject in SERVICES:
        print(f"- {slug}")
        if generate(slug, subject):
            ok += 1
    print(f"\nDone: {ok}/{len(SERVICES)} images generated.")
    if ok != len(SERVICES):
        sys.exit(1)


if __name__ == "__main__":
    main()
