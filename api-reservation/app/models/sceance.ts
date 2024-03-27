import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

// J'aimerais préciser que le mot "sceance" n'existe dans aucune langue
// En anglais pour traduire "séance" on dit "session"

export default class Sceance extends BaseModel {
  @column({ isPrimary: true })
  declare uid: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}