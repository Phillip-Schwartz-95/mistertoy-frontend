import { Link } from 'react-router-dom'

export default function ToyPreview({ toy, onRemoveToy, onEditToy }) {
  return (
    <li className="toy-preview">
      <h3>{toy.name}</h3>
      <p>Price: ${toy.price}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>

      <div className="toy-actions">
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <button onClick={() => onEditToy(toy)}>Edit</button>
        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
      </div>
    </li>
  )
}