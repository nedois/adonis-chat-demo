import Ws from '#services/socket'

await Ws.boot()

Ws.io.on('connection', (socket) => {
  console.log('new connection')
})
