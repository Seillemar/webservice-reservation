import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uid').primary()
      table.uuid('cinema_uid')
      table.string('name')
      table.integer('seats')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('cinema_uid').references('cinemas.uid')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}