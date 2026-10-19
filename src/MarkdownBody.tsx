import type { ReactNode } from 'react'

function renderInline(text: string): ReactNode[] {
  // Matches [link text](url), `inline code`, **bold**
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g
  const result: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      // Link [text](url)
      result.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="markdown-link"
        >
          {match[2]}
        </a>
      )
    } else if (match[4]) {
      // Code `code`
      result.push(<code key={match.index} className="markdown-inline-code">{match[4]}</code>)
    } else if (match[5]) {
      // Bold **bold**
      result.push(<strong key={match.index}>{match[5]}</strong>)
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result
}

export function MarkdownBody({ content }: { content: string }) {
  if (!content) return null

  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let inCodeBlock = false
  let codeBuffer: string[] = []
  let listBuffer: string[] = []
  let blockKey = 0

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push(
        <ul key={`ul-${blockKey++}`} className="markdown-list">
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )
      listBuffer = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      flushList()
      if (inCodeBlock) {
        blocks.push(
          <pre key={`pre-${blockKey++}`} className="markdown-pre">
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        )
        codeBuffer = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      continue
    }

    // List item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(trimmed.slice(2).trim())
      continue
    } else {
      flushList()
    }

    // Headings
    if (trimmed.startsWith('#### ')) {
      blocks.push(<h5 key={`h5-${blockKey++}`} className="markdown-h5">{renderInline(trimmed.slice(5))}</h5>)
    } else if (trimmed.startsWith('### ')) {
      blocks.push(<h4 key={`h4-${blockKey++}`} className="markdown-h4">{renderInline(trimmed.slice(4))}</h4>)
    } else if (trimmed.startsWith('## ')) {
      blocks.push(<h3 key={`h3-${blockKey++}`} className="markdown-h3">{renderInline(trimmed.slice(3))}</h3>)
    } else if (trimmed.startsWith('# ')) {
      blocks.push(<h2 key={`h2-${blockKey++}`} className="markdown-h2">{renderInline(trimmed.slice(2))}</h2>)
    } else if (trimmed.startsWith('> ')) {
      blocks.push(
        <blockquote key={`quote-${blockKey++}`} className="markdown-quote">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      )
    } else {
      blocks.push(<p key={`p-${blockKey++}`} className="markdown-p">{renderInline(line)}</p>)
    }
  }

  flushList()

  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push(
      <pre key={`pre-${blockKey++}`} className="markdown-pre">
        <code>{codeBuffer.join('\n')}</code>
      </pre>
    )
  }

  return <div className="markdown-body">{blocks}</div>
}
