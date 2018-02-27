import React, { Component } from "react";
import axios from "axios";
import Favorite from "../favorites/favorites";


class FavoritesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.confirmChanges = this.confirmChanges.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    axios.get("/api/favorites").then(res => {
      this.setState({
        list: res.data
      });
    });
  }

  confirmChanges(id, name, birth, gender) {
    axios
      .put("/api/favorites/update", {
        id,
        name,
        birth,
        gender,
      })
      .then(() => {
        axios.get("/api/favorites").then(res => {
          this.setState({
            list: res.data
          });
        });
      });
  }

  handleRemove(id) {
    axios.delete(`/api/favorites/${id}`).then(() => {
      axios.get("/api/favorites").then(res => {
        this.setState({
          list: res.data
        });
      });
    });
  }

  render() {
    const { list } = this.state;
    console.log(list);
    let favorites = list.map((character, index) => {
      return (
        <Favorite
          key={index}
          name={character.name}
          birth={character.birth}
          gender={character.gender}
          id={character.favorites_id}
          confirmChanges={this.confirmChanges}
          handleRemove={this.handleRemove}
        />
      );
    });
    return <div>{favorites}</div>;
  }
}

export default FavoritesList;