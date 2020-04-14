const dataLoader = require('dataloader')
const _ = require('lodash')
const { Account, Article, Author, Viewer, Collection } = require('../models')
const { projector } = require('../utils/index')

const batch = Model => async ids_selections => {
  const ids = []
  ids_selections.forEach(id_selection => {
    ids.push(id_selection.id)
  })
  const { find, info, skip, limit } = ids_selections[0]
  const selection = projector(info)
  let units = await Model.find({ _id: { $in: ids }, ...find })
    .select(selection)
    .skip(skip)
    .limit(limit)
    .then(docs => ids.map(id => docs.filter(doc => doc._id.equals(id))[0]))
  return units
}

const batchGroup = Model => async ids_selections => {
  const ids = []
  ids_selections.forEach(id_selection => {
    ids.push(id_selection.id)
  })
  const { find, info, skip, limit } = ids_selections[0]
  const selection = projector(info)
  const units = await Model.find({ _id: { $in: ids }, ...find })
    .select(selection)
    .skip(skip)
    .limit(limit)
  const unitsGroupedById = _.keyBy(units, '_id')
  const unitsGrouped = ids.map(id => _.get(unitsGroupedById, id, null))
  return unitsGrouped
}
const getLoader = (Entity, isMany = true) => {
  if (isMany) return new dataLoader(batchGroup(Entity))
  else return new dataLoader(batch(Entity))
}

module.exports = {
  accountsLoader: {
    oneToOne: getLoader(Account, false),
    oneToMany: getLoader(Account, true)
  },
  articlesLoader: {
    oneToOne: getLoader(Article, false),
    oneToMany: getLoader(Article, true)
  },
  collectionsLoader: {
    oneToOne: getLoader(Collection, false),
    oneToMany: getLoader(Collection, true)
  },
  viewersLoader: {
    oneToOne: getLoader(Viewer, false),
    oneToMany: getLoader(Viewer, true)
  },
  authorsLoader: {
    oneToOne: getLoader(Author, false),
    oneToMany: getLoader(Author, true)
  }
}
