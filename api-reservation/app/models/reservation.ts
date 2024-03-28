import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sceance from './sceance.js'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

  @belongsTo(() => User)
  declare userUid: BelongsTo<typeof User>

  @belongsTo(() => Sceance)
  declare sceanceUid: BelongsTo<typeof Sceance>

  @column()
  declare rank: number

  @column()
  declare status: string

  @column()
  declare seats: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}