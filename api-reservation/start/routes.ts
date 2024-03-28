/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import SessionController from '#controllers/session_controller'
import CinemasController from '#controllers/cinemas_controller'
import RoomsController from '#controllers/rooms_controller'

router.get('/', async () => {
    return {
        hello: 'world',
    }
})

router.post("/register", [SessionController, "store"])

router.post("/movie/:movieUid/reservations", "")    // Permet de rentrer dans le tunnel de réseration
router.post("/reservations/:uid/confirm", "")       // Permet de confirmer la réservation si le status le permet
router.get("/movie/:movieUid/reservations", "")     // Liste toutes les réservations en cours pour un film
router.get("/reservations/:uid", "")                // Permet de récupérer le détail d'une réservation

router.get("/cinema", [CinemasController, "readAll"])           // Permet de lister les cinéma
router.get("/cinema/:uid", [CinemasController, "read"])         // Permet d'afficher un cinéma
router.post("/cinema", [CinemasController, "create"])           // Permet de créer un cinéma
router.put("/cinema/:uid", [CinemasController, "update"])       // Permet de modifier un cinéma
router.delete("/cinema/:uid", [CinemasController, "destroy"])   // Permet de supprimer un cinéma

router.get("/cinema/:cinemaUid/rooms", [RoomsController, "readAll"])            // Permet de lister les salles de cinéma
router.get("/cinema/:cinemaUid/rooms/:uid", [RoomsController, "read"])          // Permet d'afficher une salle de cinéma
router.post("/cinema/:cinemaUid/rooms", [RoomsController, "create"])            // Permet de créer une salle de cinéma
router.put("/cinema/:cinemaUid/rooms/:uid", [RoomsController, "update"])        // Permet de modifier une salle de cinéma
router.delete("/cinema/:cinemaUid/rooms/:uid", [RoomsController, "destroy"])    // Permet de supprimer une salle de cinéma

router.get("/cinema/:cinemaUid/rooms/:roomUid/sceances", "")            // Permet de lister les séances d'une salle
router.post("/cinema/:cinemaUid/rooms/:roomUid/sceances", "")           // Permet de créer une séance dans une salle
router.put("/cinema/:cinemaUid/rooms/:roomUid/sceances/:uid", "")       // Permet de modifier séance dans une salle
router.delete("/cinema/:cinemaUid/rooms/:roomUid/sceances/:uid", "")    // Permet de supprimer une séance dans une salle