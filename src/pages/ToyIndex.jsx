import { useEffect, useState } from 'react'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import { toyService } from '../services/toyService.js'

export default function ToyIndex() {
  const [toys, setToys] = useState([])
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    toyService.query(filterBy).then(setToys)
  }, [filterBy])

  return (
    <section className="toy-index">
      <ToyFilter onSetFilter={setFilterBy} />
      <ToyList toys={toys} />
    </section>
  )
}

