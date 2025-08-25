import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService.js'
import { addToy, updateToy } from '../store/actions/toy.actions.js'
import { useOnlineStatus } from '../custom-hooks/useOnlineStatus.js'
import { useExitWhileUnsavedChanges } from '../custom-hooks/useExitWhileUnsavedChanges.js'

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const [isDirty, setIsDirty] = useState(false)
  const navigate = useNavigate()
  const isOnline = useOnlineStatus()

  // Warn if leaving with unsaved changes
  useExitWhileUnsavedChanges(isDirty)

  // Load toy
  useEffect(() => {
    if (toyId) {
      toyService.getById(toyId)
        .then(setToy)
        .catch(err => console.log('Cannot load toy', err))
    }
  }, [toyId])

  function handleChange({ target }) {
    const { name, value } = target
    setToy(prev => ({ ...prev, [name]: value }))
    setIsDirty(true)
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    if (!isOnline) {
      alert('You are offline! Cannot save changes.')
      return
    }

    toyService.save(toy)
      .then(savedToy => {
        toy._id ? updateToy(savedToy) : addToy(savedToy)
        setIsDirty(false)
        navigate('/toy')
      })
      .catch(err => console.log('Cannot save toy', err))
  }

  return (
    <form onSubmit={onSaveToy}>
      {!isOnline && <p style={{color: 'red'}}>Offline: changes cannot be saved</p>}
      <input name="name" value={toy.name} onChange={handleChange} />
      <input name="price" type="number" value={toy.price} onChange={handleChange} />
      <button disabled={!isOnline}>Save</button>
    </form>
  )
}
