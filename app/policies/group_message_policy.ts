import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Group from '#models/group'
import User from '#models/user'

export default class GroupMessagePolicy extends BasePolicy {
  index(user: User, group: Group): AuthorizerResponse {
    return group.hasMember(user.id)
  }

  store(user: User, group: Group): AuthorizerResponse {
    return group.hasMember(user.id)
  }
}
