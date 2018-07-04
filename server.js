const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')
// const config = require('./config')

const PORT = process.env.PORT || 3001;

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:57f652ef-7003-449c-9cf0-3bc2b48acf10',
  key: '9cc60cfc-acdb-4125-8978-794b90817cdd:asCzIjHXeqYXJiJOabUnTLXc6uLjStuq870q3Zf4Fls='
})

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('/build'));
// }

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'build/', 'public/index.html'));
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  const user = { name: username, id: username }
  chatkit
    .createUser(user)
    .then(() => {
      console.log('Created user ', user.name)
      res.status(201).json(user)
    })
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        console.log('User already exists ', user.name)
        res.status(201).json(user)
      } else {
        console.error(error)
        res.status(error.status).json(error)
      }
    })
})

app.listen(PORT, function() {
  console.log('Listening on PORT: ' + PORT)
});