import { httpService } from './httpService.js'

const TOY_API = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    addMsg,
    removeMsg,
    getEmptyToy,
    getDefaultFilter,
}

async function query(filterBy = {}, sortBy = {}) {
    try {
        const toys = await httpService.get(TOY_API, filterBy)
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
    } catch (err) {
        console.error('Error fetching toys:', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        return await httpService.get(TOY_API + toyId)
    } catch (err) {
        console.error('Error fetching toy by id:', err)
        throw err
    }
}

async function save(toy) {
    try {
        if (toy._id) return await httpService.put(TOY_API + toy._id, toy)
        return await httpService.post(TOY_API, toy)
    } catch (err) {
        console.error('Error saving toy:', err)
        throw err
    }
}

async function remove(toyId) {
    try {
        return await httpService.delete(TOY_API + toyId)
    } catch (err) {
        console.error('Error removing toy:', err)
        throw err
    }
}

async function addMsg(toyId, txt) {
  try {
    return await httpService.post(`${TOY_API}${toyId}/msg`, { txt })
  } catch (err) {
    console.error('Error adding toy msg:', err)
    throw err
  }
}

async function removeMsg(toyId, msgId) {
  try {
    return await httpService.delete(`${TOY_API}${toyId}/msg/${msgId}`)
  } catch (err) {
    console.error('Error removing toy msg:', err)
    throw err
  }
}

function getEmptyToy() {
    return {
        _id: '', // backend assigns ObjectId
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
