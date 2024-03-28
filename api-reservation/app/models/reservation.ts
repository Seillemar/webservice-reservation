import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare uid: string

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