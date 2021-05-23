const express = require("express");
const datastore = require("nedb");
const app = express();
var state = true;

app.listen(3000, () => console.log("listen 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use("favicon.ico", express.static("favicon.ico"));

const database = new datastore("database.db");
database.loadDatabase();

app.get("/score", (request, response) => {

  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/score", (request, response) =>{
  data = request.body;
  var userPost = data.user;
  var scoreUserPost = data.score;
  console.log('voy a ver si esta',userPost)

  database.find({user:userPost},function(err,docs){
    console.log(docs)
    for (var i = 0; i < docs.length; i++) {
      if(userPost == docs[i].user && scoreUserPost >= docs[i].score){

        database.remove({_id:docs[i].user},function(err, numRemoved) {
          console.log('numRemoved',numRemoved);
          database.insert(data);  
          state = false;
        });
        
      }
   
    }

  })
  if(state == true){
    database.insert(data)

  }
 
});
