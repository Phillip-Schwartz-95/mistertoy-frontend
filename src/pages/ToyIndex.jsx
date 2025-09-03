import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import {
  setToys,
  removeToySync,
  addToy,
  updateToy,
  setToyLoading
} from '../store/actions/toy.actions.js'
import { toyService } from '../services/toyService.js'

export default function ToyIndex() {
  const navigate = useNavigate()
  const toys = useSelector(state => state.toyModule.toys)
  const filterBy = useSelector(state => state.toyModule.filterBy)
  const sortBy = useSelector(state => state.toyModule.sortBy)
  const isLoading = useSelector(state => state.toyModule.isLoading)

  // ---------------- LOAD TOYS ----------------
  useEffect(() => {
    setToyLoading(true)
    toyService.query(filterBy, sortBy)
      .then(setToys)
      .catch(err => console.log('Cannot load toys', err))
      .finally(() => setToyLoading(false))
  }, [filterBy, sortBy])

  // ---------------- ADD TOY ----------------
  function onAddToy() {
    navigate('/toy/edit')  // navigate to the ToyEdit page for a new toy
  }

  // ---------------- REMOVE TOY ----------------
  function onRemoveToy(toyId) {
    removeToySync(toyId)  // optimistic update
    toyService.remove(toyId)
      .catch(err => {
        console.log('Cannot remove toy', err)
        // Rollback if failed
        setToyLoading(true)
        toyService.query(filterBy, sortBy)
          .then(setToys)
          .finally(() => setToyLoading(false))
      })
  }

  // ---------------- EDIT TOY ----------------
  function onEditToy(toy) {
    navigate(`/toy/edit/${toy._id}`)  // navigate to the ToyEdit page for an existing toy
  }

  return (
     <>
    <section className="toy-index">
      <div className="toy-controls">
        <ToyFilter />
        <button className="add-btn" onClick={onAddToy}>Add Random Toy ⛐</button>
      </div>

      {isLoading ? <p>Loading toys...</p> :
        <ToyList
          toys={toys}
          onRemoveToy={onRemoveToy}
          onEditToy={onEditToy}
        />}
    </section>
    </>
  )
}
