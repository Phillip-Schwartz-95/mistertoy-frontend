import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)

  useEffect(() => {
    toyService.get(toyId).then(setToy)
  }, [toyId])

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details">
      <h2>{toy.name}</h2>
      <img src={toy.imgUrl} alt={toy.name} />
      <p>Price: ${toy.price}</p>
      <p>Labels: {toy.labels.join(', ')}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </section>
  )
}
