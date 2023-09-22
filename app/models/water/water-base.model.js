/**
 * Base class for all models based on the legacy 'water' schema
 * @module WaterBaseModel
 */

import LegacyBaseModel from '../legacy-base.model.js'

export default class WaterBaseModel extends LegacyBaseModel {
  static get schema () {
    return 'water'
  }
}
