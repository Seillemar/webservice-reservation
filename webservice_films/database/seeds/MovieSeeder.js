'use strict'

/*
|--------------------------------------------------------------------------
| MovieSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Movie = use('App/Models/Movie')

class MovieSeeder {
  async run () {
    await Movie.create({
      uid: '1a92bf32-15b3-4a9f-9a3b-ef2f6dd75f23',
      name: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      rate: 5,
      duration: 142,
      hasReservationsAvailable: true
    })

    await Movie.create({
      uid: 'fa73612d-36a8-4d1b-8ab7-27870a68fd99',
      name: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      rate: 5,
      duration: 175,
      hasReservationsAvailable: true
    })

    await Movie.create({
      uid: '4e58bf07-6258-4f37-a6b1-2173de5934f0',
      name: 'The Dark Knight',
      description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      rate: 4,
      duration: 152,
      hasReservationsAvailable: true
    })
  }
}

module.exports = MovieSeeder
