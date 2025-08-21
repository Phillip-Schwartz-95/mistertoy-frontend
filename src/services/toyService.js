import storageService from './storageService.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
}

function query(filterBy = {}, sortBy = {}) {
  return storageService.query(STORAGE_KEY).then(toys => {
    
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

    // Sorting
    if (sortBy.type) {
      const { type, desc } = sortBy
      toys.sort((a, b) => {
        const valA = a[type]
        const valB = b[type]
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
    name: '',
    price: 0,
    inStock: true,
    labels: [],
    createdAt: Date.now(),
  }
}
