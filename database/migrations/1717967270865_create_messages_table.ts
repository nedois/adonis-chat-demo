import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.uuid('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('receiver_id').nullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('group_id').nullable().references('id').inTable('groups').onDelete('CASCADE')
      table.text('content').notNullable()
      table.enum('status', ['sent', 'delivered', 'read']).defaultTo('sent')
      table.timestamp('sent_at').notNullable()
      table.timestamp('delivered_at').nullable()
      table.timestamp('read_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
