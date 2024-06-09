import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Message from '#models/message'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare createdBy: string | null

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare creator: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'group_members',
    pivotTimestamps: {
      createdAt: 'joined_at',
      updatedAt: false,
    },
  })
  declare members: ManyToMany<typeof User>

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  async hasMember(this: Group, userId: string) {
    const [meta] = await this.related('members').query().where('id', userId).count('*')
    return Number(meta.$extras.count) === 1
  }
}
