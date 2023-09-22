// Test framework dependencies
import test from 'ava'

// Test helpers
import * as ReturnHelper from '../../support/returns/return.helper.js'
import * as VersionHelper from '../../support/returns/version.helper.js'
import VersionModel from '../../../app/models/returns/version.model.js'

// Thing under test
import ReturnModel from '../../../app/models/returns/return.model.js'

test.before('Setup test data', async (t) => {
  t.context.testRecord = await ReturnHelper.add()

  t.context.testVersions = []
  for (let i = 0; i < 2; i++) {
    // NOTE: A constraint in the lines table means you cannot have 2 records with the same returnId and versionNumber
    const versionNumber = i
    const version = await VersionHelper.add({ returnId: t.context.testRecord.returnId, versionNumber })

    t.context.testVersions.push(version)
  }
})

test('It can successfully run a basic query', async (t) => {
  const { testRecord } = t.context

  const result = await ReturnModel.query().findById(testRecord.returnId)

  t.true(result instanceof ReturnModel)
  t.is(result.returnId, testRecord.returnId)
})

test('When linking to Versions it can successfully run a related query', async (t) => {
  const result = await ReturnModel.query().innerJoinRelated('versions')

  t.truthy(result)
})

test('When linking to Versions it can successfully eager load the related Versions', async (t) => {
  const { testRecord, testVersions } = t.context

  const result = await ReturnModel.query()
    .findById(testRecord.returnId)
    .withGraphFetched('versions')

  t.true(result instanceof ReturnModel)
  t.is(result.returnId, testRecord.returnId)

  t.true(result.versions instanceof Array)
  t.true(result.versions[0] instanceof VersionModel)
  t.true(result.versions.some((version) => version.versionId === testVersions[0].versionId))
  t.true(result.versions.some((version) => version.versionId === testVersions[1].versionId))
})
