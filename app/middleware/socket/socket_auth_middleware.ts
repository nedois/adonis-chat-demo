import type { Authenticators } from '@adonisjs/auth/types'
import type { SocketMiddleware } from '#services/socket'

const SocketAuthMiddleware =
  (options: { guards?: (keyof Authenticators)[] } = {}): SocketMiddleware =>
  async (socket, next) => {
    try {
      await socket.context.auth.authenticateUsing(options.guards)
      next()
    } catch (error) {
      next(new Error(error))
    }
  }

export default SocketAuthMiddleware
