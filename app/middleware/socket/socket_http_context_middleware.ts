import { ServerResponse } from 'node:http'
import app from '@adonisjs/core/services/app'
import type { SocketMiddleware } from '#services/socket'

const SocketHttpContextMiddleware: SocketMiddleware = async (socket, next) => {
  const adonisServer = await app.container.make('server')

  // Create a http context for the socket
  const response = new ServerResponse(socket.request)
  const context = adonisServer.createHttpContext(
    adonisServer.createRequest(socket.request, response),
    adonisServer.createResponse(socket.request, response),
    app.container.createResolver()
  )

  // Initialize auth
  const auth = await app.container.make('auth.manager')
  context.auth = auth.createAuthenticator(context)

  socket.context = context

  next()
}

export default SocketHttpContextMiddleware
