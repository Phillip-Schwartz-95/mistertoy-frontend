import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) toyService.get(toyId).then(setToy)
  }, [toyId])

  function handleChange({ target }) {
    const { name, value } = target
    setToy(prev => ({ ...prev, [name]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    toyService.save(toy).then(() => navigate('/'))
  }

  return (
    <form onSubmit={onSaveToy}>
      <input name="name" value={toy.name} onChange={handleChange} />
      <input name="price" type="number" value={toy.price} onChange={handleChange} />
      <button>Save</button>
    </form>
  )
}
