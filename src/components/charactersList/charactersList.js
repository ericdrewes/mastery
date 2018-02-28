import React, { Component } from "react";
import axios from "axios";
import ChooseSide from "../favorites/darkLight/darkLight";
import Favorite from "../favorites/favorites";

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      count: 1,
      prev: false
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    // this.handleSide = this.handleSide.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    axios.get("https://swapi.co/api/people").then(res => {
      console.log(res.data.results);
      this.setState({
        list: res.data.results
      });
    });
  }

  prevPage() {
    const { prev, count } = this.state;
    axios.get(`https://swapi.co/api/people/?page=${count - 1}`).then(res => {
      this.setState({
        list: res.data.results,
        count: count - 1
      });
    });
    if (count === 2) this.setState({ prev: !prev });
  }

  nextPage() {
    const { prev, count } = this.state;
    axios.get(`https://swapi.co/api/people/?page=${count + 1}`).then(res => {
      this.setState({
        list: res.data.results,
        count: count + 1,
        prev: true
      });
    });
  }

  // handleSide(val) {
  //   console.log("fired handle side", val);
  //   const { newName } = this.state;
  //   if (val === "dark") {
  //     this.setState({
  //       darkSide: true,
  //       lightSide: false
  //     });
  //     alert(`Welcome to the Dark Side ${newName}`);
  //   } else if (val === "light") {
  //     this.setState({
  //       darkSide: false,
  //       lightSide: true
  //     });
  //          /* <ChooseSide handleSide={this.handleSide} /> *///

  //     alert(`Welcome to the Light ${newName}`);
  //   }
  // }

  handleAdd(name, birth, gender) {
    axios.post("/api/swapi_users/add", {
      name,
      birth,
      gender,
    });
  }

  render() {
    const { list, next, prev } = this.state;
    console.log(list, "hello");
    let characters = list.map((people, index) => {
      console.log(people);
      return (
        <div
          style={{
            border: "1px solid black",
            width: "20%",
            margin: "auto",
            marginBottom: "1%",
            marginTop: "1%"
          }}
        >
          <p>name: {people.name}</p>
          <p>Birth Year: {people.birth_year}</p>
          <p>Gender: {people.gender}</p>
          <button
          onClick={() => this.handleAdd(people.name, people.birth_year, people.gender)}
        >
          Add to Favorites
        </button>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="App-intro">{characters}</div>
        <button disabled={!prev} onClick={this.prevPage}>
          Previous Characters
        </button>
        <button onClick={this.nextPage}>More Characters</button>
      </div>
    );
  }
}

export default CharacterList;
