// Test framework dependencies
import test from 'ava'

// Test helpers
import * as EventHelper from '../../support/water/event.helper.js'

// Thing under test
import EventModel from '../../../app/models/water/event.model.js'

test.before('Setup test data', async (t) => {
  t.context.testRecord = await EventHelper.add()
})

test('It can successfully run a basic query', async (t) => {
  const { testRecord } = t.context

  const result = await EventModel.query().findById(testRecord.eventId)

  t.true(result instanceof EventModel)
  t.is(result.returnId, testRecord.returnId)
})
