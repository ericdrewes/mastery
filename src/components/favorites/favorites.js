import React, { Component } from "react";
import axios from "axios";
import ChooseSide from "./darkLight/darkLight";

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      newName: this.props.name,
      newBirth: this.props.birth,
      newGender: this.props.gender,
      darkSide: false,
      lightSide: false,
      updatedText: ""
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSide = this.handleSide.bind(this);
  }

  toggleEdit() {
    const { edit } = this.state;
    this.setState({
      edit: !edit
    });
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleSubmit() {
    const { id, confirmChanges } = this.props;
    const { newName, newBirth, newGender} = this.state;
    confirmChanges(id, newName, newBirth, newGender);
    this.toggleEdit();
  }

  // handleSide(val) {
  //   console.log("fired handle side", val)
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
  //     alert(`Welcome to the Light ${newName}`);
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        updatedText: "UPDATED NAME"
      });
    }
  }

  render() {
    const {
      id,
      name,
      birth,
      gender,
      handleRemove
    } = this.props;
    const {
      newName,
      newBirth,
      newGender,
      darkSide,
      lightSide
    } = this.state;
    const { edit } = this.state;

    return (
      <div>
        
        {!edit ? (
          <div>
            <h4>
              {this.state.updatedText} Name: {name}
            </h4>
            <p>Birth: {birth}</p>
            <p>Gender: {gender}</p>
            <br />
            <button onClick={this.toggleEdit}>Edit Character</button>
          </div>
        ) : (
          <div>
            <label>Name:</label>
            <input
              value={newName}
              onChange={e => this.handleChange("newName", e.target.value)}
            />
            <label>Birth:</label>
            <input
              value={newBirth}
              onChange={e => this.handleChange("newBirth", e.target.value)}
            />
            <label>Gender:</label>
            <input
              value={newGender}
              onChange={e => this.handleChange("newGender", e.target.value)}
            />
            <button onClick={this.handleSubmit}>Save Changes</button>
          </div>
        )}
        <button onClick={() => handleRemove(id)}>Remove Character</button>
      
      </div>
    );
  }
}
export default Favorite;