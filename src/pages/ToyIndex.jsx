import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import { loadToys, saveToy, removeToyOptimistic } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toyService.js'

export default function ToyIndex() {
    const dispatch = useDispatch()

    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const isLoading = useSelector(state => state.toyModule.isLoading)

    useEffect(() => {
        dispatch(loadToys())
    }, [filterBy, sortBy])

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        toyToSave.name = 'Random Toy ' + Math.floor(Math.random() * 100)
        toyToSave.price = +(Math.random() * 100).toFixed(2)

        dispatch(saveToy(toyToSave))
    }

    function onRemoveToy(toyId) {
        dispatch(removeToyOptimistic(toyId))
    }

 function onEditToy(toy) {
  // Prompt user for new values
  const name = prompt('New name?', toy.name)
  if (name === null) return 

  const priceStr = prompt('New price?', toy.price)
  if (priceStr === null) return 
  const price = +priceStr

  const inStock = confirm('Is the toy in stock? OK = Yes, Cancel = No')

  const toyToSave = { ...toy, name, price, inStock }

  // Call saveToy thunk, which updates Redux state internally
  dispatch(saveToy(toyToSave))
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
