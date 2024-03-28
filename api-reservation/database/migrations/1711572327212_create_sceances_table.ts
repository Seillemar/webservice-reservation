import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sceances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uid').primary()
      table.uuid('roomId')
      table.string('movie')
      table.timestamp('date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('roomId').references('rooms.uid')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}