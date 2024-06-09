import type { SocketMiddleware } from '#services/socket'

/** Use only with long-polling transport, otherwise create a cookie based middleware */
const SocketAuthMiddleware: SocketMiddleware = async (socket, next) => {
  await socket.context.auth.authenticateUsing(['api'])
  next()
}

export default SocketAuthMiddleware
