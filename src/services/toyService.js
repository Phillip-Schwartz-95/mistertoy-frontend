import storageService from './storageService.js'
import { demoData } from '../models/demoData.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
}

export function query(filterBy = {}, sortBy = {}) {
  return storageService.query(STORAGE_KEY).then(toys => {
    // inject demo data if storage is empty
    if (!toys || !toys.length) {
      return Promise.all(demoData.map(toy => storageService.post(STORAGE_KEY, toy)))
        .then(() => storageService.query(STORAGE_KEY)) // now all toys are saved
    }

    // --- Filtering ---
    if (filterBy.name) {
      const regex = new RegExp(filterBy.name, 'i')
      toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock !== undefined) {
      toys = toys.filter(toy => toy.inStock === filterBy.inStock)
    }
    if (filterBy.labels?.length) {
      toys = toys.filter(toy => filterBy.labels.every(lbl => toy.labels.includes(lbl)))
    }

    // --- Sorting ---
    if (sortBy.type) {
      const { type, desc } = sortBy
      toys.sort((a, b) => {
        const valA = a[type]
        const valB = b[type]

        if (typeof valA === 'string' && typeof valB === 'string') {
          return desc ? valB.localeCompare(valA) : valA.localeCompare(valB)
        }

        return desc ? valB - valA : valA - valB
      })
    }

    return toys
  })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function save(toy) {
    return toy._id
        ? storageService.put(STORAGE_KEY, toy)
        : storageService.post(STORAGE_KEY, toy)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function getEmptyToy() {
    return {
        _id: storageService._makeId(),
        name: '',
        price: 0,
        inStock: true,
        labels: [],
        createdAt: Date.now(),
    }
}

export function getDefaultFilter() {
    return {
        name: '',
        price: null,
        labels: [],
        inStock: undefined
    }
}
