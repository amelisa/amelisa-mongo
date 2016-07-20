import Mingo from 'mingo'
import { deepClone } from './util'

Mingo.setup({
  key: '_id'
})

const metaOperators = {
  $comment: true,
  $explain: true,
  $hint: true,
  $limit: true,
  $maxScan: true,
  $max: true,
  $min: true,
  $orderby: true,
  $returnKey: true,
  $showDiskLoc: true,
  $skip: true,
  $snapshot: true,
  $count: true,
  $aggregate: true,
  $distinct: true,
  $field: true,
  $mapReduce: true,
  $options: true
}

const notDocsOperators = {
  $count: true,
  $aggregate: true,
  $distinct: true,
  $mapReduce: true
}

function arrayUnique (array) {
  return [...new Set(array)]
}

class MongoQueries {

  getAllSelector () {
    return {}
  }

  getQueryResultFromArray (allDocs, expression) {
    // Mingo mutates $regex expressions
    expression = deepClone(expression)

    expression = this.normalizeExpression(expression)

    if (expression.$aggregate) {
      let agg = new Mingo.Aggregator(expression.$aggregate)
      return agg.run(allDocs)
    }

    let mingoQuery = new Mingo.Query(expression.$query)
    let cursor = mingoQuery.find(allDocs)

    if (expression.$orderby) cursor.sort(expression.$orderby)

    if (expression.$skip) cursor.skip(expression.$skip)

    if (expression.$limit) cursor.limit(expression.$limit)

    if (expression.$findOptions) {
      for (let key in expression.$findOptions) {
        let value = expression.$findOptions[key]
        cursor = cursor[key](value)
      }
    }

    if (expression.$count) return cursor.count()

    if (expression.$distinct) {
      let values = cursor
        .all()
        .map((doc) => doc[expression.$field])

      return arrayUnique(values)
    }

    // TODO: implement $mapReduce

    return cursor.all()
  }

  normalizeExpression (expression) {
    // Box queries inside of a $query and clone so that we know where to look
    // for selctors and can modify them without affecting the original object
    let normalized
    if (expression.$query) {
      normalized = {...expression}
      normalized.$query = {...normalized.$query}
    } else {
      normalized = {$query: {}}
      for (let key in expression) {
        if (metaOperators[key]) {
          normalized[key] = expression[key]
        } else {
          normalized.$query[key] = expression[key]
        }
      }
    }

    // Do not return deleted docs
    normalized.$query._del = {
      $ne: true
    }

    return normalized
  }

  mongolizeExpression (expression) {
    if (typeof expression !== 'object') return expression

    let mongolized = Array.isArray(expression) ? [] : {}

    for (let key in expression) {
      if (key === 'id') {
        mongolized._id = expression.id
        continue
      }
      mongolized[key] = this.mongolizeExpression(expression[key])
    }

    return mongolized
  }

  demongolizeDoc (doc) {
    if (!doc) return

    doc.id = doc._id
    delete doc._id
    return doc
  }

  isDocsQuery (expression) {
    if (!this.isQuery(expression)) return false

    let query = this.normalizeExpression(expression)

    for (let key in query) {
      if (notDocsOperators[key]) return false
    }

    return true
  }

  isJoinField (value) {
    if (value && typeof value === 'string' && value[0] === '$') {
      return true
    }

    return false
  }

  isJoinQuery (expression) {
    if (!this.isQuery(expression)) return false

    let query = this.normalizeExpression(expression)

    for (let key in query.$query) {
      let value = query.$query[key]
      if (this.isJoinField(value)) return true
    }

    return false
  }

  getJoinFields (expression) {
    expression = expression.$query || expression
    let joinFields = {}

    for (let key in expression) {
      let value = expression[key]
      if (this.isJoinField(value)) {
        joinFields[key] = value
      }
    }

    return joinFields
  }

  isQuery (expression) {
    return expression &&
      typeof expression === 'object' &&
      !Array.isArray(expression)
  }
}

export default MongoQueries
