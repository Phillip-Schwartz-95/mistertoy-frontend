import { httpService } from './httpService.js'

const TOY_API = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
}

function query(filterBy = {}, sortBy = {}) {
    // Backend handles filtering; sortBy can stay in frontend
    return httpService.get(TOY_API, filterBy)
        .then(toys => {
            if (!sortBy.type) return toys

            const { type, desc } = sortBy
            return toys.sort((a, b) => {
                const valA = a[type]
                const valB = b[type]

                if (typeof valA === 'string' && typeof valB === 'string') {
                    return desc ? valB.localeCompare(valA) : valA.localeCompare(valB)
                }
                return desc ? valB - valA : valA - valB
            })
        })
}

function getById(toyId) {
    return httpService.get(TOY_API + toyId)
}

function save(toy) {
    if (toy._id) return httpService.put(TOY_API + toy._id, toy)
    return httpService.post(TOY_API, toy)
}

function remove(toyId) {
    return httpService.delete(TOY_API + toyId)
}

function getEmptyToy() {
    return {
        _id: '', // backend will assign an ID
        name: '',
        price: 0,
        inStock: true,
        labels: [],
        createdAt: Date.now(),
    }
}

function getDefaultFilter() {
    return {
        name: '',
        price: null,
        labels: [],
        inStock: undefined
    }
}

