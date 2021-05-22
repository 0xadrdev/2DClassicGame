const express = require("express");
const datastore = require("nedb");
const app = express();

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
  database.insert(data);
});
