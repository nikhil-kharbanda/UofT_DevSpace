const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas')
const path = require("path")

const express = require('express')

const cors = require('cors')
const mongoData = require('./models/mongoData')
const Pusher = require('pusher')
// const {graphqlHTTP} = require('express-graphql');

const pusher = new Pusher({
  appId: "1306369",
  key: "d0c7b930b87e03a39dd0",
  secret: "ab0764f5f1fbc1f342d0",
  cluster: "us2",
  useTLS: true
});

//app config
const app = express();
const port = process.env.PORT || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx
});

//middleware
app.use(express.json());
app.use(cors())
app.use(express.static("frontend/build"))

server.applyMiddleware({ app });


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  }
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
  
//api routes
// app.get('/', (req, res) => res.status(200).send('hello'))

// app.post('/new/channel', (req, res) => {
//     const dbData = req.body;

//     console.log(dbData);

//     mongoData.create(dbData, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(201).send(data)
//         }
//     })
// });

// app.get('/get/channelList', (req, res) => {
//     mongoData.find((err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             let channels = [];
//             data.map((channelData) => {
//                 const channelInfo = {
//                     id: channelData._id,
//                     name: channelData.channelName
//                 }
//                 channels.push(channelInfo)
//             })
//             res.status(200).send(channels)
//         }
//     })
// })

// app.post('/new/message', (req, res) => {
//     const newMsg = req.body;

//     mongoData.update(
//         { _id: req.query.id },
//         { $push: { conversation: req.body } },
//         (err, data) => {
//             if (err) {
//                 console.log('Error: Saving msg aborting');
//                 console.log(err);

//                 res.status(500).send(err);
//             } else {
//                 res.status(201).send(data)
//             }
//         }
//     )
// });

// app.get('/get/data', (req, res) => {
//     mongoData.find((err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(200).send(data)
//         }
//     })
// });

// app.get('/get/conversation', (req, res) => {
//     const id = req.query.id
//     mongoData.find({ _id: id }, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(200).send(data)
//         }
//     })
// });

// app.use('graphql', graphqlHTTP({
//     graphiql: true,
//     schema: RootSchema,

// }))

db.once('open', () => {

    console.log("Pusher: DB Connected")

    const changeStream = db.collection('messages').watch();

    changeStream.on('change', (change) => {
        if(change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('conversation', 'newMessage', {
                'change': change
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })

    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
      console.log(`Use GraphQL at http://localhost:${port}${server.graphqlPath}`);
    });
  });
  