/**
 * @module ReturnHelper
 */

import { generateUUID } from '../../../app/lib/general.lib.js'
import ReturnModel from '../../../app/models/returns/return.model.js'

/**
 * Add a new return
 *
 * If no `data` is provided, default values will be used. These are
 *
 * - `returnId` - v1:1:[the generated licenceRef]:[the generated returnRequirement]:2022-04-01:2023-03-31
 * - `regime` - water
 * - `licenceType` - abstraction
 * - `licenceRef` - [randomly generated - 1/23/45/76/3672]
 * - `startDate` - 2022-04-01
 * - `endDate` - 2023-03-31
 * - `returnsFrequency` - month
 * - `status` - completed
 * - `source` - NALD
 * - `metadata` - {}
 * - `receivedDate` - 2023-04-12
 * - `returnRequirement` - [randomly generated - 10000321]
 * - `dueDate` - 2023-04-28
 * - `returnCycleId` - [random UUID]
 *
 * @param {Object} [data] Any data you want to use instead of the defaults used here or in the database
 *
 * @returns {module:ReturnModel} The instance of the newly created record
 */
export function add (data = {}) {
  const insertData = defaults(data)

  return ReturnModel.query()
    .insert({ ...insertData })
    .returning('*')
}

/**
 * Returns the defaults used when creating a new return
 *
 * It will override or append to them any data provided. Mainly used by the `add()` method, we make it available
 * for use in tests to avoid having to duplicate values.
 *
 * @param {Object} [data] Any data you want to use instead of the defaults used here or in the database
 */
export function defaults (data = {}) {
  const licenceRef = data.licenceRef ? data.licenceRef : _generateLicenceRef()
  const returnRequirement = data.returnRequirement ? data.returnRequirement : _randomInteger(10000000, 19999999)

  const defaults = {
    returnId: generateReturnId('2022-04-01', '2023-03-31', 1, licenceRef, returnRequirement),
    regime: 'water',
    licenceType: 'abstraction',
    licenceRef,
    startDate: new Date('2022-04-01'),
    endDate: new Date('2023-03-31'),
    returnsFrequency: 'month',
    status: 'completed',
    source: 'NALD',
    metadata: {},
    receivedDate: new Date('2023-04-12'),
    returnRequirement,
    dueDate: new Date('2023-04-28'),
    returnCycleId: generateUUID()
  }

  return {
    ...defaults,
    ...data
  }
}

export function generateReturnId (
  startDate = '2022-04-01',
  endDate = '2023-03-31',
  version = 1,
  licenceRef,
  returnRequirement
) {
  if (!licenceRef) {
    licenceRef = _generateLicenceRef()
  }

  if (!returnRequirement) {
    returnRequirement = _randomInteger(10000000, 19999999)
  }

  return `v${version}:1:${licenceRef}:${returnRequirement}:${startDate}:${endDate}`
}

function _generateLicenceRef () {
  const part1 = _randomInteger(1, 9)
  const part2 = _randomInteger(10, 99)
  const part3 = _randomInteger(10, 99)
  const part4 = _randomInteger(10, 99)
  const part5 = _randomInteger(1000, 9999)

  return `${part1}/${part2}/${part3}/${part4}/${part5}`
}

/**
 *
 * @param {Number} min lowest number (integer) in the range (inclusive)
 * @param {Number} max largest number (integer) in the range (inclusive)
 *
 * Credit https://stackoverflow.com/a/7228322
 *
 * @returns a number between min and max (inclusive)
 */
function _randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
