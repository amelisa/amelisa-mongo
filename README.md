# Amelisa Mongo

Mongo queries storage for [Amelisa](https://github.com/amelisa/amelisa)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Features

- In-memory mongo queries for client-side based on [mingo](https://github.com/kofrasa/mingo)
- Mongodb storage
- Memory storage with mongo queries (for tests)
- Rethinkdb storage with mongo queries (POC)
- Tests

### Installation

```
$ npm install amelisa-mongo
```

### Tests

```
$ npm test
```

### Usage

```js
import MongoStorage from 'amelisa-mongo/MongoStorage'

let storage = new MongoStorage(process.env.MONGO_URL)
let store = new Store({storage})
```

or for memory storage

```js
import MemoryStorage from 'amelisa-mongo/MemoryStorage'

let storage = new MemoryStorage()
let store = new Store({storage})
```

or for rethink storage

```js
import RethinkStorage from 'amelisa-mongo/RethinkStorage'

let storage = new RethinkStorage(process.env.RETHINK_URL)
let store = new Store({storage})
```

### Example
- [amelisa-crud-example](https://github.com/amelisa/amelisa-crud-example) example app with auth

### MIT License
Copyright (c) 2016 by Vladimir Makhaev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
