const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders:['X-App-Version'],
  exposeHeaders:[]
})

const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.bodyParser({params: true}))

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  )
})

const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => {
  require('./routes/movies')(server)
  require('./routes/users')(server)
  require('./routes/comments')(server)
  console.log(`Server started on port ${config.PORT}`)
})

