'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.get('/movies', 'MovieController.index')
    Route.get('/movies/:uid', 'MovieController.show')
    Route.post('/movies', 'MovieController.store')
    Route.put('/movies/:uid', 'MovieController.update')
    Route.delete('/movies/:uid', 'MovieController.destroy')
  }).prefix('api/v1')
  