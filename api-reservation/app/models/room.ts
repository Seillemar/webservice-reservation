import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sceance from './sceance.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare uid: number

  @hasMany(() => Sceance)
  declare sceances: HasMany<typeof Sceance>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}