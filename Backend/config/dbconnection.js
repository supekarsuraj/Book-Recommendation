const {MongoClient}=require('mongodb')
const url= 'mongodb://127.0.0.1:27017';
const client=new MongoClient(url)
const database='Books';
async function getData(){
    console.log("run");
    let result= await client.connect();
    let db=result.db(database)
    let collection= await db.collection('books')
    const response=await collection.find({}).toArray();
    console.log(response);
}
getData();