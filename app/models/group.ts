import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
