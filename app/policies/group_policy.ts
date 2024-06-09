import User from '#models/user'
import Group from '#models/group'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class GroupPolicy extends BasePolicy {
  delete(user: User, group: Group): AuthorizerResponse {
    return user.id === group.createdBy
  }
}
