import { useState, useEffect } from 'react'

export default function ToyFilter({ onSetFilter }) {
  const [filterBy, setFilterBy] = useState({ name: '', inStock: undefined })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSetFilter(filterBy)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [filterBy])

  function handleChange({ target }) {
    const { name, value } = target
    setFilterBy(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className="toy-filter">
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        onChange={handleChange}
      />
      <select name="inStock" onChange={handleChange}>
        <option value="">All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
      
    </section>
  )
}
