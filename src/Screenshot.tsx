import { useId, useRef, useState } from 'react'
import { ArrowsOut } from '@phosphor-icons/react/dist/csr/ArrowsOut'
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassPlus'
import { X } from '@phosphor-icons/react/dist/csr/X'

type Props = { name: string; alt: string; width: number; height: number; priority?: boolean }

export default function Screenshot({ name, alt, width, height, priority = false }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [actualSize, setActualSize] = useState(false)
  const id = useId()
  const src = `/screenshots/${name}.webp`
  return <>
    <button type="button" className="screenshot-button" aria-label={`Ampliar captura: ${alt}`} aria-haspopup="dialog" onClick={() => { setActualSize(false); dialog.current?.showModal() }}>
      <img src={src} width={width} height={height} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    </button>
    <dialog className="image-dialog" ref={dialog} aria-labelledby={id} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}>
      <div className="image-dialog-toolbar"><h2 id={id}>Captura real do aplicativo</h2><div><button type="button" aria-pressed={actualSize} onClick={() => setActualSize(!actualSize)}><ArrowsOut size={18} /><span>{actualSize ? 'Ajustar à tela' : 'Tamanho real'}</span></button><button type="button" aria-label="Fechar imagem" onClick={() => dialog.current?.close()}><X size={22} /></button></div></div>
      <div className={`image-dialog-content${actualSize ? ' actual-size' : ''}`} tabIndex={0} aria-label="Imagem ampliada; role para explorar"><img src={src} width={width} height={height} alt={alt} /></div>
      <p><MagnifyingGlassPlus size={15} />As imagens mostram o aplicativo real, sem simulação de interface.</p>
    </dialog>
  </>
}
