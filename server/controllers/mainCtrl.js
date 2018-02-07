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
  }
};
