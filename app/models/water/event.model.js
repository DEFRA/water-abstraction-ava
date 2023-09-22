/**
 * Model for event
 * @module EventModel
 */

import WaterBaseModel from './water-base.model.js'

export default class EventModel extends WaterBaseModel {
  static get tableName () {
    return 'events'
  }

  static get idColumn () {
    return 'eventId'
  }

  static get translations () {
    return [
      { database: 'created', model: 'createdAt' },
      { database: 'modified', model: 'updatedAt' }
    ]
  }
}
