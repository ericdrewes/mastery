import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCharacters: []
    };
  }

  componentDidMount() {
    axios.get("/api/characters").then(res => {
      this.setState({ allCharacters: res.data.results });
    });
  }

  render() {
    console.log(this.state.allCharacters);
    const allCharacters = this.state.allCharacters.map((character, i) => (
      <div key={i} className="characters">
        {/* <Link to={`/allCharacters/${character.name}`}> */}
        <div>{character.name}</div>
        {/* </Link> */}
      </div>
    ));
    return <div className="App">{allCharacters}</div>;
  }
}
