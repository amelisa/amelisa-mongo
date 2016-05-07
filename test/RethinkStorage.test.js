// import RethinkStorage from '../src/RethinkStorage'
import { shouldBehaveLikeMongoQueriesStorage } from './mongoqueriesstorage'
let RethinkStorage
try {
  RethinkStorage = require('../src/RethinkStorage')
} catch (err) {
  console.log(err)
}

const rethinkUrl = 'rethinkdb://localhost:28015/test'

describe('RethinkStorage', function () {
  if (!RethinkStorage) return

  before(async () => {
    this.storage = new RethinkStorage(rethinkUrl)
  })

  shouldBehaveLikeMongoQueriesStorage.bind(this)()
})
