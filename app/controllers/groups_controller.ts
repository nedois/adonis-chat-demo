import type { HttpContext } from '@adonisjs/core/http'
import Group from '#models/group'
import * as validator from '#validators/group'
import db from '@adonisjs/lucid/services/db'

export default class GroupsController {
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user.related('groups').query().orderBy('name', 'asc')
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(validator.store)

    return db.transaction(async (trx) => {
      const group = await new Group().merge(data).useTransaction(trx).save()

      await Promise.all([
        group.related('creator').associate(user),
        group.related('members').attach([user.id]),
      ])

      return group
    })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const group = await Group.findOrFail(params.id)
    await bouncer.with('GroupPolicy').authorize('delete', group)

    await group.delete()
  }
}
