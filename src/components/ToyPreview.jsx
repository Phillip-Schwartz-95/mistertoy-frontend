import { Link } from 'react-router-dom'

export default function ToyPreview({ toy, onRemoveToy, onEditToy, user }) {

  function handleEdit() {
    if (!user) return alert('You must be logged in to edit toys')
    if (!user.isAdmin) return alert('Only admin can edit toys')
    onEditToy?.(toy)
  }

  function handleRemove() {
    if (!user) return alert('You must be logged in to remove toys')
    if (!user.isAdmin) return alert('Only admin can remove toys')
    onRemoveToy?.(toy._id)
  }

  return (
    <li className="toy-preview">
      <h3>{toy.name}</h3>
      <p>Price: ${toy.price}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>

      <div className="toy-actions">
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  )
}
