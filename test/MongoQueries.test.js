import assert from 'assert'
import MongoQueries from '../src/MongoQueries'

let dbQueries = new MongoQueries()

describe('MongoQueries', () => {
  it('should return all selector', () => {
    let allSelector = dbQueries.getAllSelector()
    assert.equal(JSON.stringify(allSelector), '{}')
  })

  it('should isDocsQuery', () => {
    assert(!dbQueries.isDocsQuery())
    assert(!dbQueries.isDocsQuery('{}'))
    assert(!dbQueries.isDocsQuery({$count: true}))
    assert(!dbQueries.isDocsQuery({$aggregate: true}))
    assert(!dbQueries.isDocsQuery({$distinct: true}))
    assert(!dbQueries.isDocsQuery({$map: true}))
    assert(dbQueries.isDocsQuery({}))
    assert(dbQueries.isDocsQuery({name: true}))
  })

  it('should isJoinField', () => {
    assert(!dbQueries.isJoinField())
    assert(!dbQueries.isJoinField('name'))
    assert(dbQueries.isJoinField('$users.1.name'))
  })

  it('should isJoinQuery', () => {
    assert(!dbQueries.isJoinQuery())
    assert(!dbQueries.isJoinQuery('string'))
    assert(!dbQueries.isJoinQuery({}))
    assert(!dbQueries.isJoinQuery({$count: true}))
    assert(!dbQueries.isJoinQuery({name: 'value'}))
    assert(dbQueries.isJoinQuery({name: '$users.1.name'}))
  })

  it('should getJoinFields', () => {
    let joinFields = dbQueries.getJoinFields({name: '$users.1.name', age: 18})

    assert.deepEqual(joinFields, {name: '$users.1.name'})
  })

  it('should isQuery', () => {
    assert(!dbQueries.isQuery())
    assert(!dbQueries.isQuery([]))
    assert(dbQueries.isQuery({}))
  })
})
