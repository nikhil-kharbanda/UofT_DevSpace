const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

// Get all chats
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

// Get chat by id
app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id)
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(8000, console.log(`Server is running on PORT ${PORT}`));
