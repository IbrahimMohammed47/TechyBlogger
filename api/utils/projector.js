/*
  This file is used to extract graphql query fields and transform them to mongoose query projections 
*/

const graphqlFields = require('graphql-fields')
const fields = info => {
  return graphqlFields(info, {}, { excludedFields: ['__typename'] })
}
const descriptor = (node, i = 0) => {
  let emptyChild
  for (let key in node) {
    emptyChild = true
    if (Object.keys(node[key]).length !== 0) {
      descriptor(node[key], i)
      emptyChild = false
    }
    node[i++] = {
      name: key,
      val: emptyChild ? null : node[key]
    }
    delete node[key]
  }
}

const dfsTokenizer = (string, node, array) => {
  let nodeName = node.name
  if (!node.val || !embeddedDocs[nodeName]) return array.push(string + '.' + nodeName) // comments is an embedded field in article
  for (let child in node.val) {
    if (nodeName === 'root') dfsTokenizer('', node.val[child], array)
    else dfsTokenizer(string + '.' + nodeName, node.val[child], array)
  }
}

const projector = info => {
  let myfields = fields(info)
  descriptor(myfields)
  const projecttionsWithLeadingDots = []
  dfsTokenizer('', { name: 'root', val: myfields }, projecttionsWithLeadingDots)
  const projectionsArray = projecttionsWithLeadingDots.map(s => s.substring(1))
  const projections = projectionsArray.join(' ')
  return projections
}

module.exports = projector

const embeddedDocs = {
  root: true,
  comments: true
}
