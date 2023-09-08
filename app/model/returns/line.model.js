/**
 * Model for line
 * @module LineModel
 */

import { Model } from 'objection'

import ReturnsBaseModel from './returns-base.model.js'

import VersionModel from './version.model.js'

export default class LineModel extends ReturnsBaseModel {
  static get tableName () {
    return 'lines'
  }

  static get idColumn () {
    return 'lineId'
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
      version: {
        relation: Model.BelongsToOneRelation,
        modelClass: VersionModel,
        join: {
          from: 'lines.versionId',
          to: 'versions.versionId'
        }
      }
    }
  }
}
