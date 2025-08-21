const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

export default storageService

function query(key) {
  let items = JSON.parse(localStorage.getItem(key)) || []
  return Promise.resolve(items)
}

function get(key, id) {
  return query(key).then(items => items.find(item => item._id === id))
}

function post(key, newItem) {
  newItem._id = _makeId()
  return query(key).then(items => {
    items.push(newItem)
    localStorage.setItem(key, JSON.stringify(items))
    return newItem
  })
}

function put(key, updatedItem) {
  return query(key).then(items => {
    const idx = items.findIndex(item => item._id === updatedItem._id)
    items[idx] = updatedItem
    localStorage.setItem(key, JSON.stringify(items))
    return updatedItem
  })
}

function remove(key, id) {
  return query(key).then(items => {
    const filtered = items.filter(item => item._id !== id)
    localStorage.setItem(key, JSON.stringify(filtered))
    return id
  })
}

function _makeId(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < length; i++) id += chars.charAt(Math.floor(Math.random() * chars.length))
  return id
}
