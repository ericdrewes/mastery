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
    axios.get("/api/swapi_users").then(res => {
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
        gender
      })
      .then((res) => {
          this.setState({
            list: res.data
          });
        });
  }

  handleRemove(id) {
    console.log(id);
    axios.delete(`/api/swapi_users/${id}`).then(res => {
      this.setState({
        list: res.data
      });
    });
  }

  render() {
    const { list } = this.state;
    console.log(list);
    let favorites = list.map((people, index) => {
      return (
        <div 
        key={index}      
        style={{
          border: "1px solid black",
          width: "20%",
          margin: "auto",
          marginBottom: "1%",
          marginTop: "1%"
        }}>
        
          <Favorite
            key={index}
            name={people.username}
            birth={people.birth}
            gender={people.gender}
            id={people.id}
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
