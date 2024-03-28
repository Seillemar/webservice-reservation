import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from './room.js'

export default class Sceance extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

  @belongsTo(() => Room)
  declare roomId: BelongsTo<typeof Room>

  @column()
  declare movie: string

  @column.dateTime()
  declare date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}