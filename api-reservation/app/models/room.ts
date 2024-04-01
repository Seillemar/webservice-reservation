import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Cinema from './cinema.js'
import Sceance from './sceance.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

  @column()
  declare cinemaUid: string

  @column()
  declare name: string

  @column()
  declare seats: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cinema)
  declare cinema: BelongsTo<typeof Cinema>

  @hasMany(() => Sceance)
  declare sceances: HasMany<typeof Sceance>
}