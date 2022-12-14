const express = require("express");
// const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
console.log(uri);


const run = async () => {
  try {
    await client.connect();

    const headerCollaction = client.db("flipkart_db").collection("allmenu");

    const bannerCollaction = client.db("flipkart_db").collection("Banner");

    const productCollaction = client.db("flipkart_db").collection("product");

    const userCollaction = client.db("flipkart_db").collection("user");

    app.get("/menu", async (req, res) => {
      const result = await headerCollaction.find().toArray();
      res.send(result);
    });

    app.get("/banner", async (req, res) => {
      const result = await bannerCollaction.find().toArray();
      res.send(result);
    });

    // Get all Product
    app.get("/product", async (req, res )=> {
      const result=await productCollaction.find().toArray()
      res.send(result)
    });

    // create a user
    app.post("/user", async (req, res) => {
      const {firstName,
        lastName,
        email,
        password } = req.body;
      const user = { firstName, lastName, email, password };
      const insideEmail = { email: email };
      if (insideEmail) {
        res.send({message:"User Alrady Register."})
        
      } else {
      const result = await userCollaction.insertOne(user);
            res.send(result);
      }
  
    })
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
