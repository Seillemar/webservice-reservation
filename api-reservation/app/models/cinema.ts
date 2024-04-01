import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Room from './room.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Cinema extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

  @hasMany(() => Room)
  declare rooms: HasMany<typeof Room>

  @column()
  declare title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}