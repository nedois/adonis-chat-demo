import app from '@adonisjs/core/services/app'
import { Server, ServerOptions } from 'socket.io'

class Websocket {
  private booted = false

  io!: Server

  async boot() {
    /** Do not boot twice */
    if (this.booted) {
      return
    }

    this.booted = true

    const adonisServer = await app.container.make('server')
    const socketConfig = app.config.get<ServerOptions>('socket_io')

    this.io = new Server(adonisServer.getNodeServer(), socketConfig)
  }
}

export default new Websocket()
