import Ws from '#services/socket'
import SocketHttpContextMiddleware from '#middleware/socket/socket_http_context_middleware'

await Ws.boot()

Ws.io.use(SocketHttpContextMiddleware)

Ws.io.on('connection', (socket) => {
  console.log('new connection')
})
