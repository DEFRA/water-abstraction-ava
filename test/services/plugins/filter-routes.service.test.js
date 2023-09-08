// Test framework dependencies
import test from 'ava'

// Thing under test
import filterRoutesService from '../../../app/services/plugins/filter-routes.service.js'

test('When the environment is non-prod it returns the routes unchanged', (t) => {
  const routes = _routes()

  const result = filterRoutesService(routes, 'dev')

  t.true(result === routes)
})

test('When the environment is production it returns the routes filtered', (t) => {
  const routes = _routes()

  const result = filterRoutesService(routes, 'prd')

  t.true(result !== routes)
  t.true(result.length === 2)

  const includesPathToBeFiltered = result.some((path) => {
    return path.path === '/path-to-be-filtered'
  })

  t.false(includesPathToBeFiltered)
})

function _routes () {
  return [
    { path: '/' },
    { path: '/admin' },
    {
      path: '/path-to-be-filtered',
      options: { app: { excludeFromProd: true } }
    }
  ]
}
