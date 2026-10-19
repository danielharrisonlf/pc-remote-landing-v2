import { useId, useRef, useState, type CSSProperties } from 'react'
import { AndroidLogo } from '@phosphor-icons/react/dist/csr/AndroidLogo'
import { ArrowsIn } from '@phosphor-icons/react/dist/csr/ArrowsIn'
import { ArrowsOut } from '@phosphor-icons/react/dist/csr/ArrowsOut'
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassPlus'
import { WindowsLogo } from '@phosphor-icons/react/dist/csr/WindowsLogo'
import { X } from '@phosphor-icons/react/dist/csr/X'

type Frame = 'phone' | 'window'
type Props = {
  name: string
  alt: string
  width: number
  height: number
  frame: Frame
  /** Source pixels outside the app window, trimmed as [left, right, top]. */
  crop?: [number, number, number?]
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'auto'
  /** Platform chip under the frame; off for supporting devices in a group. */
  badge?: boolean
  className?: string
}

const platforms = {
  phone: { label: 'App Android', Icon: AndroidLogo },
  window: { label: 'App Windows', Icon: WindowsLogo },
}

export default function Screenshot({ name, alt, width, height, frame, crop, loading = 'lazy', fetchPriority = 'auto', badge = true, className = '' }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [actualSize, setActualSize] = useState(false)
  const id = useId()
  const src = `/screenshots/${name}.webp`
  const { label, Icon } = platforms[frame]
  // Cropping only hides desktop pixels captured around the window; the app itself is untouched.
  const [left = 0, right = 0, top = 0] = crop ?? []
  const visible = width - left - right
  const screenStyle: CSSProperties | undefined = crop ? { aspectRatio: `${visible} / ${height - top}` } : undefined
  // Percentage margins resolve against the container width, so both offsets divide by it.
  const imageStyle: CSSProperties | undefined = crop ? { width: `${(width / visible) * 100}%`, maxWidth: 'none', marginLeft: `${(-left / visible) * 100}%`, marginTop: `${(-top / visible) * 100}%` } : undefined
  return <>
    <div className={`device device-${frame} ${className}`}>
      <button type="button" className="screenshot-button" aria-label={`Ampliar captura: ${alt}`} aria-haspopup="dialog" onClick={() => { setActualSize(false); dialog.current?.showModal() }}>
        <span className="device-screen" style={screenStyle}>
          <img src={src} width={width} height={height} alt={alt} loading={loading} fetchPriority={fetchPriority} decoding="async" style={imageStyle} />
        </span>
      </button>
      {badge && <span className="device-badge" aria-hidden="true"><Icon size={14} weight="bold" />{label}</span>}
    </div>
    <dialog className="image-dialog" ref={dialog} aria-labelledby={id} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}>
      <div className="image-dialog-toolbar">
        <div className="image-dialog-title"><Icon size={18} /><h2 id={id}>Captura real do {label.replace('App', 'app')}</h2></div>
        <div className="image-dialog-actions">
          <button type="button" aria-pressed={actualSize} onClick={() => setActualSize(!actualSize)}>{actualSize ? <ArrowsIn size={18} /> : <ArrowsOut size={18} />}<span>{actualSize ? 'Ajustar à tela' : 'Tamanho real'}</span></button>
          <button type="button" className="image-dialog-close" aria-label="Fechar imagem" onClick={() => dialog.current?.close()}><X size={20} /></button>
        </div>
      </div>
      <div className={`image-dialog-content${actualSize ? ' actual-size' : ''}`} tabIndex={0} aria-label="Imagem ampliada; role para explorar" onDoubleClick={() => setActualSize(!actualSize)}><img src={src} width={width} height={height} alt={alt} decoding="async" /></div>
      <p><MagnifyingGlassPlus size={15} />Interface real do aplicativo, sem simulação. Toque duas vezes para alternar o tamanho.</p>
    </dialog>
  </>
}
