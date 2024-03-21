'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateMoviesSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments('id')
      table.uuid('uid').unique().notNullable()
      table.string('name', 128).notNullable()
      table.text('description').notNullable()
      table.integer('rate').unsigned().notNullable()
      table.integer('duration').unsigned().notNullable()
      table.boolean('hasReservationsAvailable').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = CreateMoviesSchema
