const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();

const cors = require("cors");
const port = process.env.PORT || 5000;

// midaleware

app.use(cors());
app.use(express.json());

// user-admin
// QvuYfoPkal4fSmbm

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function run() {
  const productsCollection = client
    .db("electon-eCommerce")
    .collection("products");

  try {
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const allProducts = await cursor.toArray();
      res.send(allProducts);
      console.log(allProducts);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send(" welcome to electon-eCommerce server ");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
