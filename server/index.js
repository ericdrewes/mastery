require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const mainCtrl = require("./controllers/mainCtrl")
// const BASE_URL = 
// process.env.NODE_ENV === "development"
// ? "http://localhost:3001"
// : "http://localhost:3001";

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db)
    })
    .catch(console.log);

const app = express();



app.use(express.static(`${__dirname}/../build`));



app.use(json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized: false,
        cookie: {
            maxAge: 100000 * 60 * 1000
          }
    })
)

app.get("/api/characters", mainCtrl.getCharacters);
app.post("/api/favorites", mainCtrl.saveFavorite);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port: ${process.env.PORT || 3001}`);
  });
  