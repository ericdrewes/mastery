const express = require("express");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const mainCtrl = require("./controllers/mainCtrl");
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(express.static(`${__dirname}/../build`));

app.use(json());
app.use(cors());


app.post("/api/swapi_users/add", mainCtrl.postCharacter);
app.get("/api/swapi_users", mainCtrl.getFavorites);
app.put("/api/swapi_users/update", mainCtrl.updateCharacter);
app.delete("/api/swapi_users/:id", mainCtrl.removeCharacter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});