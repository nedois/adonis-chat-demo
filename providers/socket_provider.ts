import type { ApplicationService } from '@adonisjs/core/types'

export default class SocketIoProvider {
  constructor(protected app: ApplicationService) {}

  async ready() {
    if (this.app.getEnvironment() === 'web') {
      await import('../start/socket.js')
    }
  }
}
