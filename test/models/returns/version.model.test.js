// Test framework dependencies
import test from 'ava'

// Test helpers
import * as LineHelper from '../../support/returns/line.helper.js'
import LineModel from '../../../app/models/returns/line.model.js'
import * as ReturnHelper from '../../support/returns/return.helper.js'
import ReturnModel from '../../../app/models/returns/return.model.js'
import * as VersionHelper from '../../support/returns/version.helper.js'

// Thing under test
import VersionModel from '../../../app/models/returns/version.model.js'

test.before('Setup test data', async (t) => {
  t.context.testReturn = await ReturnHelper.add()
  t.context.testRecord = await VersionHelper.add({ returnId: t.context.testReturn.returnId })

  t.context.testLines = []
  for (let i = 0; i < 2; i++) {
    // NOTE: A constraint in the lines table means you cannot have 2 records with the same versionId, substance,
    // startDate and endDate
    const substance = i === 0 ? 'water' : 'dirt'
    const line = await LineHelper.add({ versionId: t.context.testRecord.versionId, substance })

    t.context.testLines.push(line)
  }
})

test('It can successfully run a basic query', async (t) => {
  const { testRecord } = t.context

  const result = await VersionModel.query().findById(testRecord.versionId)

  t.true(result instanceof VersionModel)
  t.is(result.versionId, testRecord.versionId)
})

test('When linking to Return it can successfully run a related query', async (t) => {
  const result = await VersionModel.query().innerJoinRelated('return')

  t.truthy(result)
})

test('When linking to Return it can successfully eager load the related Return', async (t) => {
  const { testRecord, testReturn } = t.context

  const result = await VersionModel.query()
    .findById(testRecord.versionId)
    .withGraphFetched('return')

  t.true(result instanceof VersionModel)
  t.is(result.versionId, testRecord.versionId)

  t.true(result.return instanceof ReturnModel)
  t.deepEqual(result.return, testReturn)
})

test('When linking to Lines it can successfully run a related query', async (t) => {
  const result = await VersionModel.query().innerJoinRelated('lines')

  t.truthy(result)
})

test('When linking to Lines it can successfully eager load the related Lines', async (t) => {
  const { testLines, testRecord } = t.context

  const result = await VersionModel.query()
    .findById(testRecord.versionId)
    .withGraphFetched('lines')

  t.true(result instanceof VersionModel)
  t.is(result.versionId, testRecord.versionId)

  t.true(result.lines instanceof Array)
  t.true(result.lines[0] instanceof LineModel)
  t.true(result.lines.some((line) => line.lineId === testLines[0].lineId))
  t.true(result.lines.some((line) => line.lineId === testLines[1].lineId))
})
