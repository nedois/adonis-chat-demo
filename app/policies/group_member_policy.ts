import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import Group from '#models/group'

type Resource = { member: User; group: Group }

export default class GroupMemberPolicy extends BasePolicy {
  leave(user: User, resource: Resource): AuthorizerResponse {
    return user.id !== resource.group.createdBy
  }

  delete(user: User, resource: Resource): AuthorizerResponse {
    /** Only owner can remove a member and the member can't be the owner*/
    return user.id === resource.group.createdBy && user.id !== resource.member.id
  }
}
