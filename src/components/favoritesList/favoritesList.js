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
      .put("/api/swapi_users/update", {
        id,
        name,
        birth,
        gender,
      })
      .then(() => {
        axios.get("/api/swapi_users").then(res => {
          this.setState({
            list: res.data
          });
        });
      });
  }

  handleRemove(id) {
    axios.delete(`/api/swapi_users/${id}`).then(() => {
      axios.get("/api/swapi_users").then(res => {
        this.setState({
          list: res.data
        });
      });
    });
  }

  render() {
    const { list } = this.state;
    console.log(list);
    let favorites = list.map((people, index) => {
      return (
        <div>
       
        <Favorite
          key={index}
          name={people.name}
          birth={people.birth}
          gender={people.gender}
          id={people.favorites_id}
          confirmChanges={this.confirmChanges}
          handleRemove={this.handleRemove}
        />
        </div>
      );
    });
    return <div>{favorites}</div>;
  }
}

export default FavoritesList;