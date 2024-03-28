import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cinema from './cinema.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

  @belongsTo(() => Cinema)
  declare cinemaId: BelongsTo<typeof Cinema>

  @column()
  declare name: string

  @column()
  declare seats: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}