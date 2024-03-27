/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post("/movie/:movieUid/reservations", "")                        // Permet de rentrer dans le tunnel de réseration
router.post("/reservations/:uid/confirm", "")                           // Permet de confirmer la réservation si le status le permet
router.get("/movie/:movieUid/reservations", "")                         // Liste toutes les réservations en cours pour un film
router.get("/reservations/:uid", "")                                    // Permet de récupérer le détail d'une réservation

router.get("/cinema", "")                                               // Permet de lister les cinéma
router.get("/cinema/:uid", "")                                          // Permet de créer un cinéma
router.post("/cinema", "")                                              // Permet de créer un cinéma
router.put("/cinema/:uid", "")                                          // Permet de modifier un cinéma
router.delete("/cinema/:uid", "")                                       // Permet de supprimer un cinéma

router.get("/cinema/:cinemaUid/rooms", "")                              // Permet de lister les salles de cinéma
router.get("/cinema/:cinemaUid/rooms/:uid", "")                         // Permet d'afficher une salle de cinéma
router.post("/cinema/:cinemaUid/rooms", "")                             // Permet de créer une salle de cinéma
router.put("/cinema/:cinemaUid/rooms/:uid", "")                         // Permet de modifier une salle de cinéma
router.delete("/cinema/:cinemaUid/rooms/:uid", "")                      // Permet de supprimer une salle de cinéma

router.get("/cinema/:cinemaUid/rooms/:roomUid/sceances", "")            // Permet de lister les scéances d'une salle
router.post("/cinema/:cinemaUid/rooms/:roomUid/sceances", "")           // Permet de créer une scéance dans une salle
router.put("/cinema/:cinemaUid/rooms/:roomUid/sceances/:uid", "")       // Permet de modifier scéance dans une salle
router.delete("/cinema/:cinemaUid/rooms/:roomUid/sceances/:uid", "")    // Permet de supprimer une scéance dans une salle