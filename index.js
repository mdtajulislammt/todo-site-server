const express = require('express');
const  cors = require('cors');
const app = express();
require ("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// pass: 
// ourTodo


const { MongoClient, ServerApiVersion } = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
     const userTodoCollection = client.db('todo').collection('createTodo')


     //payment history post 
  app.post('/createTodo',async(req,res)=>{
     const payment = req.body;
     const result = await userTodoCollection.insertOne(payment)
     res.send(result);
    })

    app.get('/createTodo',async(req, res)=>{
     const result = await userTodoCollection.find().toArray();
     res.send(result);
   })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
     res.send(' server in running ')
});

app.listen(port,()=>{
     console.log(`server is running on port ${port}`)
})
