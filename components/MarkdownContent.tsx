function inlineText(text: string) {
  return text
}

export default function MarkdownContent({ body }: { body: string }) {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="pt-2 font-display text-[1.45rem] font-bold leading-tight text-charcoal">
              {inlineText(block.replace(/^### /, ''))}
            </h3>
          )
        }

        if (block.startsWith('## ')) {
          return (
            <h2 key={index} className="pt-4 font-display text-[1.85rem] font-bold leading-tight text-charcoal">
              {inlineText(block.replace(/^## /, ''))}
            </h2>
          )
        }

        if (block.includes('\n- ')) {
          const lines = block.split('\n')
          const intro = lines.find((line) => !line.startsWith('- '))
          const items = lines.filter((line) => line.startsWith('- ')).map((line) => line.replace(/^- /, ''))

          return (
            <div key={index}>
              {intro ? <p className="mb-3 text-[1rem] leading-[1.8] text-muted">{inlineText(intro)}</p> : null}
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[.98rem] leading-[1.7] text-muted">
                    <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                    {inlineText(item)}
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        return (
          <p key={index} className="text-[1rem] leading-[1.85] text-muted">
            {inlineText(block)}
          </p>
        )
      })}
    </div>
  )
}
