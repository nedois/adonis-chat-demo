import type { SocketMiddleware } from '#services/socket'

/** Use only with long-polling transport, otherwise create a cookie based middleware */
const SocketAuthMiddleware: SocketMiddleware = async (socket, next) => {
  try {
    await socket.context.auth.authenticateUsing(['api'])
    next()
  } catch (error) {
    next(new Error(error))
  }
}

export default SocketAuthMiddleware
