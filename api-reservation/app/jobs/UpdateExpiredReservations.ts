import Reservation from '#models/reservation';
import { DateTime } from 'luxon'

export default class UpdateExpiredReservations {
  public async handle () {
    const now = DateTime.local()
    await Reservation.query()
      .where('expiresAt', '<=', now.toSQL())
      .andWhere('status', 'en attente')
      .update({ status: 'expired' })
  }
}