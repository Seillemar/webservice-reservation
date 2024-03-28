import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uid').primary()
      table.integer("userId").notNullable()
      table.string("sceanceId").notNullable()
      table.integer('rank')
      table.string('status')
      table.integer('seats')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('userId').references('users.id')
      table.foreign('sceanceId').references('sceances.uid')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}