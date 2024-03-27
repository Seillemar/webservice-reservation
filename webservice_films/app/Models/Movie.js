'use strict'

const { v4: uuidv4 } = require('uuid')
const Model = use('Model')

class Movie extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', async (movieInstance) => {
      movieInstance.uid = uuidv4()
    })
  }

  static get primaryKey() {
    return 'uid'
  }

  static get incrementing() {
    return false
  }

  static get rules() {
    return {
      name: 'required|max:128',
      description: 'required|max:4096',
      rate: 'required|integer|range:1,5',
      duration: 'required|integer|range:1,240'
    }
  }
}

module.exports = Movie
