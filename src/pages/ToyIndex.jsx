import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToyList from '../components/ToyList.jsx'
import ToyFilter from '../components/ToyFilter.jsx'
import { loadToys } from '../store/actions/toy.actions.js'

export default function ToyIndex() {
  const dispatch = useDispatch()

  const toys = useSelector(state => state.toyModule.toys)
  const filterBy = useSelector(state => state.toyModule.filterBy)
  const sortBy = useSelector(state => state.toyModule.sortBy)
  const isLoading = useSelector(state => state.toyModule.isLoading)

  useEffect(() => {
    dispatch(loadToys())
  }, [filterBy, sortBy])

  //function onSetFilter(newFilter) {
   // dispatch(setToyFilter(newFilter))
  //}

  return (
    <section className="toy-index">
      <ToyFilter/>
      {isLoading ? <p>Loading toys...</p> : <ToyList toys={toys} />}
    </section>
  )
}
