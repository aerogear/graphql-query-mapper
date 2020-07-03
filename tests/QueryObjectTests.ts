import test from "ava";
const info = require('./mocks/infoBasic.json')
import {getQueryObject} from '../src/QueryFields'

test('test buildQueryObject', async (t) => {
  const query = getQueryObject(info)
  t.deepEqual(query.hasRelation('category'), true)
  t.deepEqual(query.getRelationFields('category'), 'name as category__name')
  t.deepEqual(query.getRootFields(), 'title')
})

test('test expandToGraph', async (t) => {
  const query = getQueryObject(info)
  const graph = query.expandToGraph([{
    'category__name': 'test'
  }])

  t.deepEqual(graph[0].category, { 'name': 'test' })
})

test('test hasRelations', async (t) => {
  const query = getQueryObject(info)
  t.deepEqual(query.hasRelations(), true)
})
