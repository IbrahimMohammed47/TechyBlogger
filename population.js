const mongoose = require('mongoose')
const { Account, Viewer, Author, Article, Collection } = require('./api/models/index')

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected successfully'))
  .then(async () => {
    const accs = []
    const authors = []
    const viewers = []
    const articles = []
    const collections = []
    // creating 100 accounts
    for (let i = 0; i < 100; i++) {
      accs.push({
        _id: mongoose.Types.ObjectId(),
        firstName: `fname_${i}`,
        lastName: `lname_${i}`,
        email: `acc@weread_${i}`,
        password: `123456`
      })
    }
    // creating 20 authors
    for (let i = 0; i < 20; i++) {
      authors.push({
        _id: mongoose.Types.ObjectId(),
        rate: 0,
        account: accs[i]._id,
        articles: []
      })
    }
    // creating 100 articles
    for (let i = 0; i < 100; i++) {
      articles.push({
        _id: mongoose.Types.ObjectId(),
        title: `title_${i}`,
        body: `lorem Ipsum is kinna cool_${i}`,
        rate: (i % 5) + 0.3,
        tags: getTags(),
        reacts: getReacts(),
        comments: [],
        author: authors[i % 20]._id
      })
    }
    //binding authors with articles
    let rateSum = 0
    for (let a = 0; a < 20; a++) {
      rateSum = 0
      for (let j = a * 5; j < a * 5 + 5; j++) {
        authors[a].articles.push(articles[j]._id)
        rateSum += articles[j].rate
      }
      authors[a].rate = rateSum / 5
    }

    // creating 80 viewers
    for (let i = 20; i < 100; i++) {
      viewers.push({
        _id: mongoose.Types.ObjectId(),
        account: accs[i]._id,
        collections: [],
        friends: [],
        interests: getTags()
      })
    }

    // viewers comment on articles
    for (let i = 0; i < 100; i++) {
      articles[i].comments.push({
        text: getComment(),
        viewer: viewers[Math.floor(Math.random() * 80)]._id
      })
      articles[i].comments.push({
        text: getComment(),
        viewer: viewers[Math.floor(Math.random() * 80)]._id
      })
    }
    // creating 160 collection, 2 for every user
    let collectionTitle = ''
    for (let i = 0; i < 160; i++) {
      collectionTitle
      if (i < 80) collectionTitle = 'favorites'
      else collectionTitle = 'toRead'
      collections.push({
        _id: mongoose.Types.ObjectId(),
        title: collectionTitle,
        viewer: viewers[i % 80]._id,
        articles: []
      })
    }
    // binding viewers with collections
    for (let a = 0; a < 80; a++) {
      viewers[a].collections.push(collections[a]._id)
      viewers[a].collections.push(collections[a + 80]._id)
    }
    // binding articles with collections
    for (let i = 0; i < 160; i++) {
      for (let j = 0; j < 5; j++) {
        collections[i].articles.push(articles[Math.floor(Math.random() * 100)]._id)
      }
    }
    // each viewer has 5 viewer friends
    for (let a = 0; a < 80; a++) {
      for (let i = 1; i <= 5; i++) {
        viewers[a].friends.push(viewers[(a + i) % 80]._id)
      }
    }

    const promises = []
    accs.forEach(e => {
      promises.push(Account.create(e))
    })
    viewers.forEach(e => {
      promises.push(Viewer.create(e))
    })
    authors.forEach(e => {
      promises.push(Author.create(e))
    })
    articles.forEach(e => {
      promises.push(Article.create(e))
    })
    collections.forEach(e => {
      promises.push(Collection.create(e))
    })
    await Promise.all(promises)
    console.log('POPULATED DB')
  })
  .catch(err => console.log('got error' + err))

function getTags() {
  let tags = ['science', 'art', 'tech', 'religion', 'sports', 'politics']
  let initialTag = Math.floor(Math.random() * 6)
  return [tags[initialTag], tags[(initialTag + 1) % 6]]
}
function getComment() {
  let comments = ['cool article', 'i love u man', 'high quality content', 'great article', 'go learn english', 'you heard of punctuation ?']
  return comments[Math.floor(Math.random() * 6)]
}
function getReacts() {
  let counter = Math.floor(Math.random() * 20)
  let reacts = ['like', 'love', 'haha', 'sad', 'angry']
  let chosenReacts = []
  while (counter != 0) {
    chosenReacts.push(reacts[Math.floor(Math.random() * 5)])
    counter--
  }
  return chosenReacts
}
