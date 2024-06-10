import { DateTime } from 'luxon'
import emitter from '@adonisjs/core/services/emitter'
import { Socket } from 'socket.io'
import Ws from '#services/socket'
import User from '#models/user'
import Group from '#models/group'
import Message from '#models/message'

// TODO: use class events instead

declare module '@adonisjs/core/types' {
  interface EventsList {
    'user:connected': { user: User; socket: Socket }
    'user:disconnected': { user: User; socket: Socket }
    'group:members:joined': { member: User; group: Group }
    'group:members:removed': { member: User; group: Group }
    'group:members:left': { member: User; group: Group }
    'group:messages:created': { message: Message; group: Group }
  }
}

emitter.on('user:connected', async function ({ user, socket }) {
  user.merge({ lastSeen: DateTime.local() }).save()

  // Join all user group rooms
  const userGroups = await user.related('groups').query().select('id')
  userGroups.forEach((group) => socket.join(`group_${group.id}`))
})

emitter.on('user:disconnected', function ({ user }) {
  // You can do anything here, like updating user presence, etc
  console.log(`${user.username} disconnected`)
})

emitter.on('group:members:joined', function ({ member, group }) {
  Ws.io.to(`group_${group.id}`).emit('group:members:joined', member)
})
