import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import {
  loadToys,
  deleteToy,
} from '../store/actions/toy.actions.js'

export default function ToyIndex() {
  const navigate = useNavigate()
  const toys = useSelector(state => state.toyModule.toys)
  const filterBy = useSelector(state => state.toyModule.filterBy)
  const sortBy = useSelector(state => state.toyModule.sortBy)
  const isLoading = useSelector(state => state.toyModule.isLoading)

  // ---------------- LOAD TOYS ----------------
  useEffect(() => {
    loadToys(filterBy, sortBy)
  }, [filterBy, sortBy])

  function onAddToy() {
    navigate('/toy/edit')
  }

  async function onRemoveToy(toyId) {
    try {
      await deleteToy(toyId)
    } catch (err) {
      console.error('Cannot remove toy', err)
    }
  }

  function onEditToy(toy) {
    navigate(`/toy/edit/${toy._id}`)
  }

  return (
    <section className="toy-index">
      <div className="toy-controls">
        <ToyFilter />
        <button className="add-btn" onClick={onAddToy}>
          Add Random Toy ⛐
        </button>
      </div>

      {isLoading ? (
        <p>Loading toys...</p>
      ) : (
        <ToyList
          toys={toys}
          onRemoveToy={onRemoveToy}
          onEditToy={onEditToy}
        />
      )}
    </section>
  )
}