const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');
const path = require("path");
const Pusher = require('pusher');

const PORT = process.env.PORT || 3001;

const app = express();

const pusher = new Pusher({
    appId: 'APP_ID',
    key: 'APP_KEY',
    secret: 'SECRET',
    cluster: 'YOUR CLUSTER',
    encrypted: true
});

// const chatkit = new Chatkit.default({
//   instanceLocator: 'v1:us1:57f652ef-7003-449c-9cf0-3bc2b48acf10',
//   key: '9cc60cfc-acdb-4125-8978-794b90817cdd:asCzIjHXeqYXJiJOabUnTLXc6uLjStuq870q3Zf4Fls='
// })

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
// app.use("/", routes);
app.use((err, req, res, next) => {
  res.status(500).json(err);
});

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/message/send', (req, res) => {
    pusher.trigger( 'private-reactchat', 'messages', {
        message: req.body.message,
        username: req.body.username
    });
    res.sendStatus(200);
});

// Below is for the ChatKit app

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
