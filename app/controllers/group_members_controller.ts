import type { HttpContext } from '@adonisjs/core/http'
import Group from '#models/group'
import User from '#models/user'

export default class GroupMembersController {
  async index({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const groupId = params.group_id

    const group = await Group.findOrFail(groupId)

    return group.related('members').query().paginate(page, limit)
  }

  /** Join group */
  async store({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const groupId = params.group_id

    const group = await Group.findOrFail(groupId)

    // Use sync instead of attach to duplicate error constraint
    await group.related('members').sync([user.id], false)

    return { message: `You have joined ${group.name}` }
  }

  /** Remove a member */
  async destroy({ params, bouncer }: HttpContext) {
    const groupId = params.group_id
    const memberId = params.id

    const [group, member] = await Promise.all([
      Group.findOrFail(groupId),
      User.findOrFail(memberId),
    ])

    await bouncer.with('GroupMemberPolicy').authorize('delete', { group, member })

    await group.related('members').detach([member.id])

    return { message: `You have removed ${member.username} from ${group.name}` }
  }

  /** Leave group */
  async leave({ auth, params, bouncer }: HttpContext) {
    const user = auth.getUserOrFail()
    const groupId = params.group_id

    const group = await Group.findOrFail(groupId)

    await bouncer.with('GroupMemberPolicy').authorize('leave', { member: user, group })

    await group.related('members').detach([user.id])

    return { message: `You have left ${group.name}` }
  }
}
