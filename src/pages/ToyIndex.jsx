import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import { loadToys, setToyFilter } from '../store/actions/toy.actions.js'

export default function ToyIndex() {
  const dispatch = useDispatch()

  const toys = useSelector(state => state.toyModule.toys)
  const filterBy = useSelector(state => state.toyModule.filterBy)
  const isLoading = useSelector(state => state.toyModule.isLoading)

  useEffect(() => {
    dispatch(loadToys())
  }, [filterBy])

  function onSetFilter(newFilter) {
    dispatch(setToyFilter(newFilter))
  }

  return (
    <section className="toy-index">
      <ToyFilter onSetFilter={onSetFilter} />
      {isLoading ? <p>Loading toys...</p> : <ToyList toys={toys} />}
    </section>
  )
}
