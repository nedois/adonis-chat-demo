import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import Group from '#models/group'
import Message from '#models/message'
import * as validator from '#validators/group_message'

export default class GroupMessagesController {
  async index({ params, request, bouncer }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const group = await Group.findOrFail(params.group_id)

    await bouncer.with('GroupMessagePolicy').authorize('index', group)

    return group.related('messages').query().preload('sender').paginate(page, limit)
  }

  async store({ auth, params, request, bouncer }: HttpContext) {
    const sender = auth.getUserOrFail()
    const data = await request.validateUsing(validator.store)
    const group = await Group.findOrFail(params.group_id)

    await bouncer.with('GroupMessagePolicy').authorize('store', group)

    const message = new Message().merge({ ...data, senderId: sender.id })

    await group.related('messages').create(message)

    emitter.emit('group:messages:created', { message, group })

    return message
  }
}
