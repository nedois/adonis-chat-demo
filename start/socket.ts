import Ws from '#services/socket'
import SocketHttpContextMiddleware from '#middleware/socket/socket_http_context_middleware'
import SocketAuthMiddleware from '#middleware/socket/socket_auth_middleware'

await Ws.boot()

Ws.io.use(SocketHttpContextMiddleware).use(SocketAuthMiddleware({ guards: ['api'] }))

Ws.io.on('connection', (socket) => {
  console.log('new connection')
})
