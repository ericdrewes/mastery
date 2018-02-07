const axios = require("axios");

module.exports = {
  getCharacters: (req, res) => {
    axios
      .get("http://swapi.co/api/people")
      .then(response => {
        // console.log(response);
        return res.status(200).json(response.data);
      })
      .catch(console.log);
  },
  saveFavorite: (req, res, next) => {
    const db = req.app.get("db");
    const { id, img, name } = req.body;
    let data = { ...req.body};
    console.log(data);

    db
      .save_favorite_character(data)
      .then(favorite => res.status(200).json(favorite))
      .catch(console.log);
  },

};
