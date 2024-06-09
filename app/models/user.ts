import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Group from '#models/group'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare displayName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare username: string

  @column.dateTime()
  declare lastSeen: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static readonly accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Group, {
    pivotTable: 'group_members',
    pivotTimestamps: {
      createdAt: 'joined_at',
      updatedAt: false,
    },
  })
  declare groups: ManyToMany<typeof Group>
}
