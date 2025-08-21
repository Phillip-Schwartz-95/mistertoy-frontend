import { Link } from 'react-router-dom'

export default function ToyPreview({ toy }) {
  return (
    <li className="toy-preview">
      <h3>{toy.name}</h3>
      <p>Price: ${toy.price}</p>
      <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <Link to={`/toy/${toy._id}`}>Details</Link>
    </li>
  )
}
