/**
 * Base class for all models based on the legacy 'returns' schema
 * @module ReturnsBaseModel
 */

import LegacyBaseModel from '../legacy-base.model.js'

export default class ReturnsBaseModel extends LegacyBaseModel {
  static get schema () {
    return 'returns'
  }
}
