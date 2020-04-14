const { projector } = require('../utils')

const fieldResolvesToOne = (fieldName, loaderName) => async (parent, { filter, lastId, pageSize, pageNumber }, { dataloaders }, info) => {
  if (!parent[fieldName]) return null
  const limit = pageSize
  let skip
  if (pageNumber) skip = pageSize * (pageNumber - 1)
  const find = { ...lastId, ...filter }
  return dataloaders[loaderName].oneToOne.load({
    id: parent[fieldName],
    find,
    info,
    skip,
    limit
  })
}

const fieldResolvesToMany = (fieldName, loaderName) => async (parent, { filter, lastId, pageSize, pageNumber }, { dataloaders }, info) => {
  if (!parent[fieldName] || parent[fieldName].length === 0) return []
  if (filter) {
    filter = JSON.stringify(filter)
    filter = filter.replace(/"eq"|"lt"|"gt"|"in"|"regex"|"elemMatch"/g, m => `${m.charAt(0)}$${m.substring(1)}`)
    filter = JSON.parse(filter)
  }
  if (lastId) {
    lastId = { _id: { $gt: lastId } }
  }
  const limit = pageSize
  let skip
  if (pageNumber) skip = pageSize * (pageNumber - 1)
  const find = { ...lastId, ...filter }
  const ids_selections = parent[fieldName].map(id => {
    return { id, find, info, skip, limit }
  })
  return dataloaders[loaderName].oneToMany.loadMany(ids_selections)
}

const queryResolvesToMany = Model => async (root, { filter, lastId, pageSize, pageNumber }, { req, res }, info) => {
  if (filter) {
    filter = JSON.stringify(filter)
    filter = filter.replace(/"eq"|"lt"|"gt"|"in"|"regex"|"elemMatch"/g, m => `${m.charAt(0)}$${m.substring(1)}`)
    filter = JSON.parse(filter)
  }
  if (lastId) {
    lastId = { _id: { $gt: lastId } }
  }
  const limit = pageSize
  let skip
  if (pageNumber) skip = pageSize * (pageNumber - 1)
  const find = { ...lastId, ...filter }
  let selection = projector(info)
  const vals = await Model.find(find)
    .select(selection)
    .skip(skip)
    .limit(limit)
  return vals
}

const queryResolvesToOne = Model => async (root, { id }, { req, res }, info) => {
  const selection = projector(info)
  return await Model.findById(id).select(selection)
}

module.exports = {
  queryResolvesToOne,
  queryResolvesToMany,
  fieldResolvesToOne,
  fieldResolvesToMany
}
