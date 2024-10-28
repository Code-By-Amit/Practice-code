const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function getdata() {
    let result = await client.connect();
    let db = result.db("class");
    // let response = await db.collection("student").find()
    return db.collection('student')
}

// getdata().then((resp) => {
//     resp.find().toArray()
//     .then(data => console.log(data))
// });

let main = async () => {
    var data = await getdata();
    data = await data.find().toArray();
    console.log(data);
};

main();
