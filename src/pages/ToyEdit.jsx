import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService.js'
import { addToy, updateToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()

  // ---------------- LOAD TOY ----------------
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
  }

  function onSaveToy(ev) {
    ev.preventDefault()

    toyService.save(toy)
      .then(savedToy => {
        toy._id ? updateToy(savedToy) : addToy(savedToy)
        navigate('/toy')
      })
      .catch(err => console.log('Cannot save toy', err))
  }

  return (
    <form onSubmit={onSaveToy}>
      <input name="name" value={toy.name} onChange={handleChange} />
      <input name="price" type="number" value={toy.price} onChange={handleChange} />
      <button>Save</button>
    </form>
  )
}

