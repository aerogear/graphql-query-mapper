import test from "ava";
const info = require('./mocks/infoBasic.json')

test('test buildQueryObject', async (t) => {
  const query = buildQueryObject(info)
  t.strictEqual(query.hasRelation('category'), true)
  t.deepEqual(query.getRelationFields('category'), 'name as category__name')
  t.deepEqual(query.getRootFields(), 'title')
})

test('test expandToGraph', async (t) => {
  const query = buildQueryObject(info)
  const graph = query.expandToGraph([{
    'category__name': 'test'
  }], ['category'])

  t.deepEqual(graph[0].category, { 'name': 'test' })
})