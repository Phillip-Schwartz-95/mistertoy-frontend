import { useEffect } from 'react'

export function useExitWhileUnsavedChanges(hasUnsavedChanges) {
  useEffect(() => {
    function handleBeforeUnload(ev) {
      if (!hasUnsavedChanges) return
      ev.preventDefault()
      ev.returnValue = '' // required for Chrome
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])
}
