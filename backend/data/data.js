// Test Data

const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Michael",
        email: "michael@example.com",
      },
      {
        name: "Nikhil",
        email: "nikhil@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Michael",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest",
        email: "guest@example.com",
      },
      {
        name: "Stephany",
        email: "Stephany@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "talha",
        email: "talha@example.com",
      },
      {
        name: "Stephany",
        email: "Stephany@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "talha",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Michael",
        email: "michael@example.com",
      },
      {
        name: "Stephany",
        email: "Stephany@example.com",
      },
      {
        name: "Guest",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Michael",
      email: "michael@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jeff",
        email: "Jeff@example.com",
      },
      {
        name: "Stephany",
        email: "Stephany@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jeff",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Michael",
        email: "michael@example.com",
      },
      {
        name: "Stephany",
        email: "Stephany@example.com",
      },
      {
        name: "Guest",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Best Coders",
    groupAdmin: {
      name: "Michael",
      email: "michael@example.com",
    },
  },
];

module.exports = { chats };
