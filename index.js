const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors=require('cors')
const port =4000;
const ObjectId=require('mongodb').ObjectId;

// Here I have mongo db password please take this 
// QYnRholYbhVMBajt

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufugb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{
        
        await client.connect();
        // console.log('connected to the database')
        const database = client.db("Carstore");

         const geniusCar= database.collection("hugecollection");
          
// find a single otion 
app.get('/cars/:carId', async(req,res)=>{
    const id =req.params.carId;
    const query={_id:ObjectId(id)};
    const result=await geniusCar.findOne(query);
    res.send(result);
    console.log(result)

    
})
      app.delete('/cars/:carId',async (req,res)=>{
          const id=req.params.carId;
          const query={_id:ObjectId(id)};
          const result=await geniusCar.deleteOne(query);
          res.json(result);

      })
        app.get('/cars',async (req,res)=>{
            const cursor=geniusCar.find({});
            const services =await cursor.toArray();
            res.send(services)


        })

         app.post('/cars',async(req,res)=>{
             const services =req.body
             console.log('yes we are hitting api ');
             
             const result=await geniusCar.insertOne(services);
            
            res.send(result);
         })  
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir)




app.get('/',(req,res)=>{
     res.send('We are here bro ');
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })