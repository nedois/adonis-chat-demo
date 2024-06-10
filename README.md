# Adonis chat demo

This repository contains a simple demo application that integrates AdonisJS with Socket.IO, featuring user authentication. The project demonstrates how to set up a basic one-to-one chat application where users can log in, join chat rooms, and exchange messages in real-time.

## Features

- [x] Socket.io singleton server
- [x] Integration with `@adonisjs/auth`
- [x] User authentication (register, login)
- [x] Groups (create and delete)
- [x] Group members (list, join, leave, remove)
- [x] Group messages (list, send)
- [ ] Private messages (list, send)
- [ ] Realtime notifications
- [ ] Inertia+React frontend

## WIP

## How to

Access the socket.io server:

```ts
import Ws from '#services/socket'

const io = Ws.io // singleton instance
```

Access the current user in the socket context

```ts
Ws.io.on('connection', async (socket) => {
  const user = socket.context.auth.getUserOrFail()
  ...
})
```
