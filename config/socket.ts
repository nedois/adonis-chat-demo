import type { ServerOptions } from 'socket.io'
import { HttpContext } from '@adonisjs/core/http'

const socketIoConfig: Partial<ServerOptions> = {
  cors: {
    origin: '*',
  },
}

export default socketIoConfig

declare module 'socket.io' {
  interface Socket {
    context: HttpContext
  }
}
