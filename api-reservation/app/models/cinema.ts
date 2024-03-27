import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Room from './room.js'

export default class Cinema extends BaseModel {
  @column({ isPrimary: true })
  declare uid: number

  @hasMany(() => Room)
  declare rooms: HasMany<typeof Room>

  @column()
  declare title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}