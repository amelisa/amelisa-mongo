import MemoryStorage from '../src/MemoryStorage'
import { shouldBehaveLikeMongoQueriesStorage } from './mongoqueriesstorage'

describe('MemoryStorage', function () {
  before(async () => {
    this.storage = new MemoryStorage()
  })

  shouldBehaveLikeMongoQueriesStorage.bind(this)()
})
