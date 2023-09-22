// Test framework dependencies
import test from 'ava'

// Test helpers
import * as LineHelper from '../../support/returns/line.helper.js'
import * as VersionHelper from '../../support/returns/version.helper.js'
import VersionModel from '../../../app/models/returns/version.model.js'

// Thing under test
import LineModel from '../../../app/models/returns/line.model.js'

test.before('Setup test data', async (t) => {
  t.context.testVersion = await VersionHelper.add()
  t.context.testRecord = await LineHelper.add({ versionId: t.context.testVersion.versionId })
})

test('It can successfully run a basic query', async (t) => {
  const { testRecord } = t.context

  const result = await LineModel.query().findById(testRecord.lineId)

  t.true(result instanceof LineModel)
  t.is(result.lineId, testRecord.lineId)
})

test('When linking to Version it can successfully run a related query', async (t) => {
  const result = await LineModel.query().innerJoinRelated('version')

  t.truthy(result)
})

test('When linking to Version it can successfully eager load the related Version', async (t) => {
  const { testRecord, testVersion } = t.context

  const result = await LineModel.query()
    .findById(testRecord.lineId)
    .withGraphFetched('version')

  t.true(result instanceof LineModel)
  t.is(result.lineId, testRecord.lineId)

  t.true(result.version instanceof VersionModel)
  t.deepEqual(result.version, testVersion)
})
