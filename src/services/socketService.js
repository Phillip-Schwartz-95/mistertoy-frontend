import { io } from 'socket.io-client'

const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3030'
  : 'https://mistertoy-backend-o4uh.onrender.com'

export const socketService = createSocketService()

function createSocketService() {
  let socket

  return {
    setup() {
      socket = io(BASE_URL)
    },
    on(event, cb) {
      socket.on(event, cb)
    },
    off(event, cb) {
      socket.off(event, cb)
    },
    emit(event, data) {
      socket.emit(event, data)
    },
    terminate() {
      socket.disconnect()
      socket = null
    }
  }
}
