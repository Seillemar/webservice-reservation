import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uid').primary()
      table.integer("user_id").notNullable()
      table.string("sceance_uid").notNullable()
      table.integer('rank')
      table.string('status')
      table.integer('seats')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('user_id').references('users.id')
      table.foreign('sceance_uid').references('sceances.uid')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}