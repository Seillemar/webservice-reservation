import Reservation from '#models/reservation';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';


export default class ReservationsController {
    public async enter({ request, response }: HttpContext) {
        try {
            // Récupérer les données de la requête
            const { sceanceUid, userUid, seats } = request.only(['sceanceUid', 'userUid', 'seats']);

            if (userUid === undefined || sceanceUid === undefined || seats === undefined) {
                // Si un des éléments sont manquants, retournez une réponse d'erreur 422 avec un message approprié
                response.status(422).json({ message: 'Le contenu de l\'objet réservation dans le body est invalide' });
                return; // Arrêtez l'exécution de la fonction
            }

            // Récupérer le nombre de réservations déjà effectuées pour cette séance
            const existingReservations = await Reservation.query()
                .where('sceanceId', sceanceUid)
                .count('* as total');

            // Extraire le nombre total de réservations
            const existingReservationsCount = existingReservations.length;

            // Calculer le rang de la nouvelle réservation
            const rank = existingReservationsCount + 1;

            // Calculer la date d'expiration (1 semaine après la réservation)
            const expiresAt = DateTime.local().plus({ days: 7 });

            // Créer une nouvelle réservation avec .fill()
            const reservation = new Reservation();
            reservation.fill({
                sceanceUid: sceanceUid,
                userUid: userUid,
                seats: seats,
                rank: rank,
                status: 'waiting', // ou valide ou expiré selon le cas
                expiresAt: expiresAt // ou utilisez la date de réservation fournie par la requête
            });

            // Sauvegarder la réservation dans la base de données
            await reservation.save();

            // Retourner une réponse de succès
            response.status(201).json({ message: 'Réservation ajoutée avec succès', data: reservation });
        } catch (error) {
            // En cas d'erreur, retourner une réponse d'erreur
            response.status(500).json({ message: 'erreur internew', error: error.message });
        }
    }

    public async confirm({ request, response }: HttpContext) {
        try {
            // Récupérer les données de la requête
            const { userUid, sceanceUid, rank } = request.only(['userUid', 'sceanceUid', 'rank']);

            if (userUid === undefined || sceanceUid === undefined || rank === undefined) {
                // Si un des éléments sont manquants, retournez une réponse d'erreur 422 avec un message approprié
                response.status(422).json({ message: 'Le contenu de l\'objet réservation dans le body est invalide' });
                return; // Arrêtez l'exécution de la fonction
            }

            if(rank === 1){
                const actualStatus = await Reservation.query()
                    .where('userUid', userUid)
                    .where('sceanceUid', sceanceUid)
                    .first();
                
                if(actualStatus !== undefined && actualStatus !== null) {
                    if (actualStatus.status === 'waiting') {
                        await Reservation.query()
                            .where('userUid', userUid)
                            .where('sceanceUid', sceanceUid)
                            .update({ status: 'confirmed' });

                        await Reservation.query()
                            .where('seanceUid', sceanceUid)
                            .where('status', 'waiting')
                            .where('rank', '>', 1)
                            .decrement('rank', 1);

                        return response.status(201).json({ message: 'Réservation effectuée avec succès' });
                    } else if(actualStatus.status === 'expired'){
                        return response.status(410).json({ message: 'La réservation est expirée'});
                    }
                }
            }

        } catch (error) {
            // En cas d'erreur, retourner une réponse d'erreur
            response.status(500).json({ message: 'erreur internew', error: error.message });
        }
    }

    public async readAll({response}: HttpContext)
    {
        try {
            const reservation = await Reservation.all();
            if(reservation){
                return reservation;
            } else {
                return response.status(204).json({message: 'Reservations not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }

    public async read({response, params}: HttpContext)
    {
        try {
            const reservation = await Reservation.find(params.name);
            if(reservation){
                return reservation;
            } else {
                return response.status(404).json({message: 'Reservation not found'});
            }
        } catch (error) {
        	return response.status(500).json({error: error});
        }
    }
}