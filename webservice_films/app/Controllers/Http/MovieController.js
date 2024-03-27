'use strict'

const Movie = use('App/Models/Movie')

class MovieController {
  async index({ response }) {
    try {
      const movies = await Movie.all()
      if (movies.rows.length === 0) {
        return response.status(204).json({ message: 'Pas de résultat de recherche' })
      }
      return response.status(200).json(movies)
    } catch (error) {
      return response.status(500).json({ message: 'Erreur interne' })
    }
  }

  async show({ params, response }) {
    try {
      const movie = await Movie.findBy('uid', params.uid)
      if (!movie) {
        return response.status(404).json({ message: 'Le film est inconnu' })
      }
      return response.status(200).json(movie)
    } catch (error) {
      return response.status(500).json({ message: 'Erreur interne' })
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only(['uid', 'name', 'description', 'rate', 'duration'])
      const movie = await Movie.create(data)
      return response.status(201).json(movie)
    } catch (error) {
      if (error.name === 'ValidationException') {
        return response.status(422).json({ message: 'Le contenu de l\'objet film dans le body est invalide' })
      }
      return response.status(500).json({ message: 'Erreur interne' })
    }
  }

  async update({ params, request, response }) {
    try {
      const movie = await Movie.findBy('uid', params.uid)
      if (!movie) {
        return response.status(404).json({ message: 'Le film est inconnu' })
      }
      const data = request.only(['name', 'description', 'rate', 'duration'])
      movie.merge(data)
      await movie.save()
      return response.status(200).json(movie)
    } catch (error) {
      if (error.name === 'ValidationException') {
        return response.status(422).json({ message: 'Le contenu de l\'objet film dans le body est invalide' })
      }
      return response.status(500).json({ message: 'Erreur interne' })
    }
  }

  async destroy({ params, response }) {
    try {
      const movie = await Movie.findBy('uid', params.uid)
      if (!movie) {
        return response.status(404).json({ message: 'Le film est inconnu' })
      }
      await movie.delete()
      return response.status(204).json({ message: 'Les film est affiché avec succès' })
    } catch (error) {
      return response.status(500).json({ message: 'Erreur interne' })
    }
  }
}

module.exports = MovieController