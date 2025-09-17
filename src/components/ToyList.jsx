import ToyPreview from './ToyPreview.jsx'

export default function ToyList({ toys, onRemoveToy, onEditToy, user }) {
  return (
    <ul className="toy-list">
      {toys.map(toy => (
        <ToyPreview 
          key={toy._id} 
          toy={toy} 
          onRemoveToy={onRemoveToy} 
          onEditToy={onEditToy} 
          user={user}
        />
      ))}
    </ul>
  )
}

