import emitter from '@adonisjs/core/services/emitter'
import Ws from '#services/socket'
import SocketHttpContextMiddleware from '#middleware/socket/socket_http_context_middleware'
import SocketAuthMiddleware from '#middleware/socket/socket_auth_middleware'

await Ws.boot()

Ws.io.use(SocketHttpContextMiddleware).use(SocketAuthMiddleware({ guards: ['api'] }))

Ws.io.on('connection', async (socket) => {
  const user = socket.context.auth.getUserOrFail()
  emitter.emit('user:connected', { user, socket })

  socket.on('disconnect', () => {
    emitter.emit('user:disconnected', { user, socket })
    socket.disconnect()
  })
})
