import { useSelector, useDispatch } from 'react-redux'
import { SET_TOY_FILTER, SET_TOY_SORT } from '../store/reducers/toy.reducer.js'

export default function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const dispatch = useDispatch()

    // Handle text / inStock filter changes
    function handleFilterChange(ev) {
        const { name, value } = ev.target
        let newValue = value
        if (name === 'inStock') {
            if (value === '') newValue = undefined
            else newValue = value === 'true'
        }
        dispatch({ type: SET_TOY_FILTER, filterBy: { ...filterBy, [name]: newValue } })
    }

    // Handle sort field change
    function handleSortChange(ev) {
        const value = ev.target.value
        dispatch({ type: SET_TOY_SORT, sortBy: { ...sortBy, type: value } })
    }

    // Toggle ascending / descending
    function toggleDesc() {
        dispatch({ type: SET_TOY_SORT, sortBy: { ...sortBy, desc: !sortBy.desc } })
    }

    return (
        <section className="toy-filter">
            <input
                type="text"
                name="name"
                value={filterBy.name || ''}
                placeholder="Search by name"
                onChange={handleFilterChange}
            />

            <select name="inStock" value={filterBy.inStock ?? ''} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
            </select>

            <select value={sortBy.type || ''} onChange={handleSortChange}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created At</option>
            </select>

            <button type="button" onClick={toggleDesc}>
                {sortBy.desc ? '↓ Desc' : '↑ Asc'}
            </button>
        </section>
    )
}
