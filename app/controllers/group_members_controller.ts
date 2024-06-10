import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import Group from '#models/group'
import User from '#models/user'

export default class GroupMembersController {
  async index({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const group = await Group.findOrFail(params.group_id)

    return group.related('members').query().paginate(page, limit)
  }

  /** Join group */
  async store({ auth, params }: HttpContext) {
    const member = auth.getUserOrFail()

    const group = await Group.findOrFail(params.group_id)

    // Use sync instead of attach to duplicate error constraint
    await group.related('members').sync([member.id], false)

    emitter.emit('group:members:joined', { member, group })

    return { message: `You have joined ${group.name}` }
  }

  /** Remove a member */
  async destroy({ params, bouncer }: HttpContext) {
    const memberId = params.id

    const [group, member] = await Promise.all([
      Group.findOrFail(params.group_id),
      User.findOrFail(memberId),
    ])

    await bouncer.with('GroupMemberPolicy').authorize('delete', { group, member })

    await group.related('members').detach([member.id])

    emitter.emit('group:members:removed', { member, group })

    return { message: `You have removed ${member.username} from ${group.name}` }
  }

  /** Leave group */
  async leave({ auth, params, bouncer }: HttpContext) {
    const member = auth.getUserOrFail()
    const groupId = params.group_id

    const group = await Group.findOrFail(groupId)

    await bouncer.with('GroupMemberPolicy').authorize('leave', { member, group })

    await group.related('members').detach([member.id])

    emitter.emit('group:members:left', { member, group })

    return { message: `You have left ${group.name}` }
  }
}
