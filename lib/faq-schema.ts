import type { FaqBlock } from '@/lib/pulsepoint-clinic-faqs'

/** Flatten FAQ blocks into plain text for schema.org acceptedAnswer. */
export function faqBlocksToPlainText(blocks: FaqBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        return block.text
      }

      const items = block.items.map((item) => `• ${item}`).join(' ')
      return block.intro ? `${block.intro} ${items}` : items
    })
    .join(' ')
}

/** Strip leading FAQ numbering (e.g. "1. Question" → "Question"). */
export function normalizeFaqQuestion(question: string): string {
  return question.replace(/^\d+\.\s*/, '').trim()
}
