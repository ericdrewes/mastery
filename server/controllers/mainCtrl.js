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
    const { username, birth, gender } = req.body;
    req.app
      .get("db")
      .post_character({ username, birth, gender })
      .then(character => {
        return res.status(200).json(character);
      })
      .catch(err => res.status(500).json(err));
  },
  getFavorites: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_favorites()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => res.status(500).json(err));
  },
  updateCharacter: (req, res) => {
    const dbInstance = req.app.get("db");
    console.log(req.body);
    dbInstance
      .update({
        username: req.body.id.updatedName,
        birth: req.body.id.updatedBirth,
        gender: req.body.id.updatedGender,
        id: req.body.id.id
      })
      .then(character => {
        res.status(200).json(character);
      })
      .catch(console.log);
  },
  removeCharacter: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db
      .delete_characters(req.params)
      .then(character => {
        res.status(200).json(character);
      })
      .catch(err => res.status(500).json(err));
  }
};
