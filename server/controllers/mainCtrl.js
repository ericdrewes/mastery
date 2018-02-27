const axios = require("axios");

module.exports = {
  getCharacters: (req, res) => {
    let id = req.query.page;
    if (!id) {
      id = 1;
    }
    axios
      .get(`http://swapi.co/api/people/?page=${id}`)
      .then(characters => {
        list = characters.data.results;
        res.status(200).json(list);
      })
      .catch(err => res.status(500).json(err));
  },
  postCharacter: (req, res) => {
    const { name, birth, gender } = req.body;
    console.log(req.app.get("db").post_character);
    req.app
      .get("db")
      .post_character({ name, birth, gender })
      .then(character => {
        console.log("savings");
        return res.status(200).json(character);
      })
      .catch(err => res.status(500).json(err));
  },
  getFavorites: (req, res) => {
    const dbInstance = req.app.get("db");
    console.log("hello")
    dbInstance
      .get_favorites()
      .then(characters => {
        console.log(characters)
        res.status(200).json(characters);
      })
      .catch(err => res.status(500).json(err));
  },
  updateCharacter: (req, res) => {
    const db = req.app.get("db");
    const { id, name, birth, gender } = req.body;
    db
      .update_character([id, name, birth, gender])
      .then(character => {
        res.status(200).json(character);
      })
      .catch(err => res.status(500).json(err));
  },
  removeCharacter: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db
      .remove_character([id])
      .then(character => {
        res.status(200).json(character);
      })
      .catch(err => res.status(500).json(err));
  }
};
