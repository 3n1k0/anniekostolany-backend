require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();

const uri = `mongodb+srv://AnnieKostolany:${process.env.MONGO_DB_PASSWORD}@cluster0.mq7ec.mongodb.net?retryWrites=true&w=majority`;

app.get("/get-posts", async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db("Blog").collection("Posts");
  const query = {};
  const options = {
    projection: { _id: 1, content: 1, title: 1, tags: 1, excerpt: 1 },
  };

  const posts = await collection.find(query, options).toArray();

  res.json(posts);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
