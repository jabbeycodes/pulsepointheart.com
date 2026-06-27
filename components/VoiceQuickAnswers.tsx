import type { VoiceAnswer } from '@/lib/voice-seo'

type VoiceQuickAnswersProps = {
  answers: VoiceAnswer[]
  /** Defaults to "Quick answers". Use a conversational H2 for voice-intent pages. */
  heading?: string
  /** Optional intro line — keep direct for featured snippets. */
  intro?: string
  className?: string
}

/**
 * Conversational Q&A block optimized for voice search, featured snippets, and Speakable schema.
 * Answers use `.voice-answer` so assistants can read concise responses aloud.
 */
export default function VoiceQuickAnswers({
  answers,
  heading = 'Quick answers',
  intro,
  className = 'bg-graybg',
}: VoiceQuickAnswersProps) {
  return (
    <section
      id="voice-quick-answers"
      aria-labelledby="voice-quick-answers-heading"
      className={`px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px] ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="voice-quick-answers-heading"
          className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]"
        >
          {heading}
        </h2>
        <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
        {intro ? (
          <p className="mt-4 max-w-3xl text-[.94rem] leading-[1.75] text-muted">{intro}</p>
        ) : null}
        <dl className="mt-8 space-y-4">
          {answers.map((item) => (
            <div key={item.question} className="rounded-md bg-white p-6 shadow-card">
              <dt className="text-[.98rem] font-bold text-charcoal">{item.question}</dt>
              <dd className="voice-answer mt-2 text-[.86rem] leading-[1.65] text-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
