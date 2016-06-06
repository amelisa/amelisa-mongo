function deepClone (object) {
  if (object == null || typeof object !== 'object') return object

  return JSON.parse(JSON.stringify(object))
}

export default {
  deepClone
}
