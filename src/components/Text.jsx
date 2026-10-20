import { Fragment } from 'react'

// Copy in content/*.yaml is written as poems: one line per line, blank line between stanzas.
export function Stanza({ text, className = 'stanza' }) {
  if (!text) return null
  const stanzas = text.trim().split(/\n\s*\n/)
  return (
    <div className={className}>
      {stanzas.map((stanza, i) => (
        <p key={i}>
          {stanza.split('\n').map((line, j, lines) => (
            <Fragment key={j}>{line}{j < lines.length - 1 && <br />}</Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}

const inline = (text) => text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
  part.startsWith('**') && part.endsWith('**')
    ? <strong key={i}>{part.slice(2, -2)}</strong>
    : <Fragment key={i}>{part}</Fragment>
)

// The small subset of Markdown the FAQ answers use: paragraphs, "- " lists and **bold**.
export function RichText({ text }) {
  if (!text) return null
  const blocks = []
  for (const raw of text.trim().split('\n')) {
    const line = raw.trim()
    const last = blocks[blocks.length - 1]
    if (!line) blocks.push({ type: 'gap' })
    else if (line.startsWith('- ')) {
      if (last?.type === 'list') last.items.push(line.slice(2))
      else blocks.push({ type: 'list', items: [line.slice(2)] })
    } else if (last?.type === 'p') last.lines.push(line)
    else blocks.push({ type: 'p', lines: [line] })
  }
  return (
    <div className="rich-text">
      {blocks.map((b, i) => {
        if (b.type === 'list') return <ul key={i}>{b.items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ul>
        if (b.type === 'p') return <p key={i}>{inline(b.lines.join(' '))}</p>
        return null
      })}
    </div>
  )
}
