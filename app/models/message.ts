import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Group from '#models/group'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare senderId: string

  @belongsTo(() => User, { foreignKey: 'senderId' })
  declare sender: BelongsTo<typeof User>

  @column()
  declare receiverId: string | null

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  declare receiver: BelongsTo<typeof User>

  @column()
  declare groupId: string | null

  @column()
  declare group: BelongsTo<typeof Group>

  @column()
  declare content: string

  @column()
  declare status: 'sent' | 'delivered' | 'read'

  @column.dateTime({ autoCreate: true })
  declare sentAt: DateTime

  @column.dateTime()
  declare deliveredAt: DateTime | null

  @column.dateTime()
  declare readAt: DateTime | null

  @beforeCreate()
  static ensureReceiverOrGroupIsDefined(message: Message) {
    if (!message.receiverId && !message.groupId) {
      throw new Error('Either receiverId or groupId must be defined')
    }
  }
}
