import { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
    const toyToSave = toyService.getEmptyToy()
    toyToSave.name = 'Random Toy ' + Math.floor(Math.random() * 100)
    toyToSave.price = +(Math.random() * 100).toFixed(2)

    toyService.save(toyToSave)
      .then(savedToy => addToy(savedToy))
      .catch(err => console.log('Cannot add toy', err))
  }

  // ---------------- REMOVE TOY ----------------
  function onRemoveToy(toyId) {
    // Optimistic update
    removeToySync(toyId)
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
    const name = prompt('New name?', toy.name)
    if (name === null) return
    const priceStr = prompt('New price?', toy.price)
    if (priceStr === null) return
    const price = +priceStr
    const inStock = confirm('Is the toy in stock? OK = Yes, Cancel = No')

    const toyToSave = { ...toy, name, price, inStock }

    toyService.save(toyToSave)
      .then(savedToy => {
        toy._id ? updateToy(savedToy) : addToy(savedToy)
      })
      .catch(err => console.log('Cannot save toy', err))
  }

  return (
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
  )
}
