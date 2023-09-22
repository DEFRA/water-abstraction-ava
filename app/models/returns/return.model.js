/**
 * Model for return
 * @module ReturnModel
 */

import { Model } from 'objection'

import ReturnsBaseModel from './returns-base.model.js'

import VersionModel from './version.model.js'

export default class ReturnModel extends ReturnsBaseModel {
  static get tableName () {
    return 'returns'
  }

  static get idColumn () {
    return 'returnId'
  }

  static get translations () {
    return []
  }

  // Defining which fields contain json allows us to insert an object without needing to stringify it first
  static get jsonAttributes () {
    return [
      'metadata'
    ]
  }

  static get relationMappings () {
    return {
      versions: {
        relation: Model.HasManyRelation,
        modelClass: VersionModel,
        join: {
          from: 'returns.returnId',
          to: 'versions.returnId'
        }
      }
    }
  }
}
