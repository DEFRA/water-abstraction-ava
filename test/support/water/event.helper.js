/**
 * @module EventHelper
 */

import EventModel from '../../../app/models/water/event.model.js'
import { timestampForPostgres } from '../../../app/lib/general.lib.js'

/**
 * Add a new event
 *
 * If no `data` is provided, default values will be used. These are
 *
 * - `type` - billing-batch
 * - `subtype` - supplementary
 * - `issuer` - test.user@defra.gov.uk
 * - `metadata` - batch: {
                    id: '744c307f-904f-43c4-9458-24f062381d02',
                    type: 'supplementary',
                    region: {
                      id: 'bd114474-790f-4470-8ba4-7b0cc9c225d7'
                    },
                    scheme: 'sroc'
                  }
                }
 * - `status` - start
 * - `createdAt` - current Date and time as an ISO string
 * - `updatedAt` - current Date and time as an ISO string
 *
 * @param {Object} [data] Any data you want to use instead of the defaults used here or in the database
 *
 * @returns {module:EventModel} The instance of the newly created record
 */
export function add (data = {}) {
  const insertData = defaults(data)

  return EventModel.query()
    .insert({ ...insertData })
    .returning('*')
}

/**
 * Returns the defaults used
 *
 * It will override or append to them any data provided. Mainly used by the `add()` method, we make it available
 * for use in tests to avoid having to duplicate values.
 *
 * @param {Object} [data] Any data you want to use instead of the defaults used here or in the database
 */
export function defaults (data = {}) {
  const timestamp = timestampForPostgres()

  const defaults = {
    type: 'billing-batch',
    subtype: 'supplementary',
    issuer: 'test.user@defra.gov.uk',
    metadata: {
      batch: {
        id: '744c307f-904f-43c4-9458-24f062381d02',
        type: 'supplementary',
        region: {
          id: 'bd114474-790f-4470-8ba4-7b0cc9c225d7'
        },
        scheme: 'sroc'
      }
    },
    status: 'start',
    createdAt: timestamp,
    updatedAt: timestamp
  }

  return {
    ...defaults,
    ...data
  }
}
