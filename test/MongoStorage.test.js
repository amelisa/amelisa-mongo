// import MongoStorage from '../src/MongoStorage'
import { shouldBehaveLikeMongoQueriesStorage } from './mongoqueriesstorage'
let MongoStorage
try {
  MongoStorage = require('../src/MongoStorage')
} catch (err) {
  console.log(err)
}

const mongoUrl = 'mongodb://localhost:27017/test'

describe('MongoStorage', function () {
  if (!MongoStorage) return

  before(async () => {
    this.storage = new MongoStorage(mongoUrl)
  })

  shouldBehaveLikeMongoQueriesStorage.bind(this)()
})
