# Autonomous SEO Engine for PulsePoint Clinic

A fully autonomous, enterprise-grade SEO content system for pulsepointheart.com. Generates physician-verified article drafts, analyzes competitors, detects content gaps, and continuously optimizes based on performance data.

## Architecture

```
lib/seo-engine/
├── types/              # Shared TypeScript interfaces
├── research/           # Keyword intelligence & competitor analysis
│   └── keyword-intelligence.ts
├── content/            # Article generation & quality assurance
│   ├── generator.ts
│   └── quality-checker.ts
├── publish/            # Publishing orchestration & Supabase integration
│   └── orchestrator.ts
├── analytics/          # Performance tracking & self-improvement
│   └── performance.ts
└── index.ts            # Main engine orchestrator

scripts/seo-engine/
└── run.ts              # CLI entry point
```

## Phases

### Phase 1: Research & Intelligence
- Keyword opportunity generation (local + national)
- Competitor content gap analysis
- Seasonal trend detection
- Emerging topic identification
- Keyword cannibalization detection

### Phase 2: Content Generation
- Topic creation with unique angles
- Article draft generation (1200-2500 words)
- SEO metadata (titles, descriptions, slugs)
- Schema markup recommendations
- Internal/external link suggestions
- FAQ generation
- Social media snippets

### Phase 3: Quality Assurance
- Duplicate topic detection
- Keyword density validation
- Readability scoring (Flesch)
- Heading hierarchy check
- Medical disclaimer verification
- CTA presence validation
- External reference authority check

### Phase 4: Publishing Workflow
- Editorial calendar generation (4x/week cadence)
- Draft saving to Supabase (unpublished, physician-review status)
- Google indexing notification
- Sitemap invalidation

### Phase 5: Performance Loop
- Google Search Console metrics tracking
- CTR and ranking analysis
- Content decay detection
- Strategy auto-adjustment
- Monthly report generation

## Commands

```bash
# Full engine cycle (runs all phases)
npx tsx scripts/seo-engine/run.ts run

# Research-only mode
npx tsx scripts/seo-engine/run.ts research

# Content refresh recommendations
npx tsx scripts/seo-engine/run.ts refresh

# Generate monthly report
npx tsx scripts/seo-engine/run.ts report
```

## Configuration

Edit `lib/seo-engine/index.ts` → `DEFAULT_CONFIG`:

| Option | Default | Description |
|--------|---------|-------------|
| `strategy.phase` | `local-dominance` | Current SEO phase |
| `weeklyCadence` | `4` | Articles per week |
| `minWordCount` | `1200` | Minimum article length |
| `maxWordCount` | `2500` | Maximum article length |
| `requirePhysicianReview` | `true` | **Always true for medical content** |
| `autoPublishAfterReview` | `false` | Manual approval required |
| `geoTargets` | `['columbia', 'central-missouri']` | Geographic focus |

## Physician Review Gate

**CRITICAL**: All generated content is saved to Supabase with `is_published: false`. A physician (Dr. Tibuakuu) must review and approve before publication. This is non-negotiable for medical content.

The engine never auto-publishes medical content. It prepares drafts for review.

## Cron Schedule

Recommended: Run the engine daily at 6:00 AM to prepare drafts for the week.

```bash
0 6 * * * cd /root/pulsepointheart && npx tsx scripts/seo-engine/run.ts run
```

Or use the Hermes cronjob (already configured in `cronjob` skill).

## Integration with Existing Pipeline

The engine integrates with existing PulsePoint systems:
- **Supabase** — Saves drafts to `blog_posts` table
- **Google Indexing** — Reuses `lib/google-indexing.ts` post-publish
- **Schema** — Follows existing `BlogPosting`, `MedicalWebPage`, `FAQPage` patterns
- **Local SEO** — Injects Columbia/Boone County context automatically
- **Social** — Generates snippets compatible with Content360

## Safety Guardrails

1. **Medical Disclaimer** — Every draft includes "not a substitute for medical advice"
2. **Physician Attribution** — All drafts authored by Dr. Martin Tibuakuu
3. **No Auto-Publish** — Drafts require manual physician approval
4. **Factual Accuracy** — Quality checker flags unsupported claims
5. **Local Context** — Columbia MO references required for local content
6. **Authoritative References** — AHA, ACC, CDC citations enforced

## Future Enhancements

- [ ] Live competitor scraping via SerpAPI/ScrapingBee
- [ ] Google Search Console API integration for real metrics
- [ ] LLM-powered content generation (currently uses templates)
- [ ] Physician review dashboard UI
- [ ] A/B testing framework for titles/meta descriptions
- [ ] Backlink opportunity detection
- [ ] Programmatic SEO for condition pages

## License

Proprietary — PulsePoint Clinic
