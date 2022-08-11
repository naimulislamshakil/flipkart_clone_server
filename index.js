const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.amlvbxb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const headerCollaction = client.db("flipkart_db").collection("allmenu");

    app.get("/menu", async (req, res) => {
      const result = await headerCollaction.find().toArray();
      res.send(result);
    });
  } finally {
    // await client.close()
  }
};

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("How are you?");
});

app.listen(port, () => {
  console.log(`flipkart server side runing ${port}`);
});
