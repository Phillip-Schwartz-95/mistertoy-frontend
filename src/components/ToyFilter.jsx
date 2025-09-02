import { useSelector, useDispatch } from 'react-redux'
import { SET_TOY_FILTER, SET_TOY_SORT } from '../store/reducers/toy.reducer.js'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material'

export default function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const dispatch = useDispatch()

    function handleFilterChange(ev) {
        const { name, value } = ev.target
        let newValue = value
        if (name === 'inStock') {
            if (value === '') newValue = undefined
            else newValue = value === 'true'
        }
        dispatch({ type: SET_TOY_FILTER, filterBy: { ...filterBy, [name]: newValue } })
    }

    function handleSortChange(ev) {
        const value = ev.target.value
        dispatch({ type: SET_TOY_SORT, sortBy: { ...sortBy, type: value } })
    }

    function toggleDesc() {
        dispatch({ type: SET_TOY_SORT, sortBy: { ...sortBy, desc: !sortBy.desc } })
    }

    return (
        <section className="toy-filter">
            <TextField
                label="Search by name"
                name="name"
                value={filterBy.name || ''}
                onChange={handleFilterChange}
                variant="standard"
                fullWidth
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>In Stock</InputLabel>
                <Select
                    name="inStock"
                    value={filterBy.inStock ?? ''}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">In Stock</MenuItem>
                    <MenuItem value="false">Out of Stock</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy.type || ''} onChange={handleSortChange}>
                    <MenuItem value="">Sort by</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="createdAt">Created At</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" onClick={toggleDesc}>
                {sortBy.desc ? '↓ Desc' : '↑ Asc'}
            </Button>
        </section>
    )
}
