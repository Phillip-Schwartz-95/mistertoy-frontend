import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService.js'

export default function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.getById(toyId).then(setToy)
    }, [toyId])

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            {toy.imgUrl && <img src={toy.imgUrl} alt={toy.name} />}
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
        </section>
    )
}
