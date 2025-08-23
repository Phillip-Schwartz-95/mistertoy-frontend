import { useEffect } from 'react'

export default function Popup({ heading, footer, children, onClose }) {
  
  useEffect(() => {
    function handleKeyDown(ev) {
      if (ev.key === 'Escape') onClose?.()
    }
    document.body.addEventListener('keydown', handleKeyDown)
    return () => document.body.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        {heading && <header>{heading}</header>}
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  )
}