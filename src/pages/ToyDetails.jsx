import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService.js'
import Popup from '../components/Popup.jsx'
import Chat from '../components/Chat.jsx'

export default function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    toyService.getById(toyId)
      .then(setToy)
      .catch(err => console.log('Cannot load toy', err))
  }, [toyId])

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details">
      <h2>{toy.name}</h2>
      <img src={toy.imgUrl} alt={toy.name} />
      <p>Price: ${toy.price}</p>
      <p>Labels: {toy.labels.join(', ')}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>

      {/* Chat button */}
      <button onClick={() => setIsChatOpen(true)}>💬 Chat</button>

      {isChatOpen && (
        <Popup
          heading="Toy Chat"
          footer={<button onClick={() => setIsChatOpen(false)}>Close</button>}
          onClose={() => setIsChatOpen(false)}
        >
          <Chat />
        </Popup>
      )}
    </section>
  )
}
