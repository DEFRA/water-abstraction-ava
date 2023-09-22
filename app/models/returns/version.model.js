/**
 * Model for version
 * @module VersionModel
 */

import { Model } from 'objection'

import ReturnsBaseModel from './returns-base.model.js'

import LineModel from './line.model.js'
import ReturnModel from './return.model.js'

export default class VersionModel extends ReturnsBaseModel {
  static get tableName () {
    return 'versions'
  }

  static get idColumn () {
    return 'versionId'
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
      return: {
        relation: Model.BelongsToOneRelation,
        modelClass: ReturnModel,
        join: {
          from: 'versions.returnId',
          to: 'returns.returnId'
        }
      },
      lines: {
        relation: Model.HasManyRelation,
        modelClass: LineModel,
        join: {
          from: 'versions.versionId',
          to: 'lines.versionId'
        }
      }
    }
  }
}
