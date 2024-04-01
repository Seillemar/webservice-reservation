import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cinemas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uid').primary()
      table.string('title')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}