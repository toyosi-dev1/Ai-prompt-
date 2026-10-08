import { memo, useMemo, useRef } from 'react'
import { Bookmark, Check, Copy, RefreshCw } from 'lucide-react'
import FormatPreview from './FormatPreview'
import PromptMetadata from './PromptMetadata'
import { countWords, describePrompt } from '../utils/promptGenerator'
import { useCopy } from '../utils/useCopy'

const skeletonWidths = ['w-full', 'w-11/12', 'w-full', 'w-4/5', 'w-full', 'w-2/3']

function PromptOutput({ result, loading, isSaved, onSave, onRegenerate }) {
  const { copied, copy } = useCopy()
  const textRef = useRef(null)
  const details = useMemo(() => (result ? describePrompt(result.settings) : []), [result])
  const ready = Boolean(result) && !loading

  const handleCopy = async () => {
    const succeeded = await copy(result.text)
    if (!succeeded && textRef.current) window.getSelection()?.selectAllChildren(textRef.current)
  }

  return (
    <section className="panel" aria-labelledby="output-title" aria-busy={loading}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <h2 id="output-title" className="text-lg font-semibold tracking-tight">
          Generated prompt
        </h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary" disabled={!ready} onClick={handleCopy}>
            {copied ? <Check aria-hidden="true" className="h-4 w-4 text-accent" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="btn btn-secondary" disabled={!ready || isSaved} onClick={onSave}>
            {isSaved ? <Check aria-hidden="true" className="h-4 w-4 text-accent" /> : <Bookmark aria-hidden="true" className="h-4 w-4" />}
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button type="button" className="btn btn-secondary" disabled={!ready} onClick={onRegenerate}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            Regenerate
          </button>
        </div>
      </div>

      <div className="min-h-[26rem] p-5 sm:p-6">
        {loading && (
          <div aria-hidden="true" className="space-y-3 rounded-lg border border-line bg-raised p-5 sm:p-6">
            {skeletonWidths.map((width, index) => (
              <div key={index} className={`h-4 animate-pulse rounded bg-line-strong/60 ${width}`} />
            ))}
          </div>
        )}

        {!loading && !result && (
          <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-lg border border-dashed border-line-strong px-6 text-center">
            <p className="font-serif text-lg text-ink">Your prompt will appear here.</p>
            <p className="mt-2 max-w-xs text-sm text-muted">Choose your settings, then select Generate Prompt to see the finished prompt and its structure.</p>
          </div>
        )}

        {ready && (
          <div key={result.id} className="reveal">
            <div className="rounded-lg border border-line bg-raised p-5 sm:p-6">
              <FormatPreview aspectRatio={result.settings.aspectRatio} style={result.settings.style} />
              <p ref={textRef} className="mt-5 font-serif text-[1.0625rem] leading-8 text-ink">
                {result.text}
              </p>
              <p className="mt-4 text-xs text-muted">
                {countWords(result.text)} words, version {result.variant + 1}
              </p>
            </div>
            <PromptMetadata items={details} />
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(PromptOutput)
