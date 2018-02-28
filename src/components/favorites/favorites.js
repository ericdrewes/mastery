import React, { Component } from "react";
import axios from "axios";

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: props.id,
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
    const { username, birth, gender } = this.state;
    confirmChanges(this.state);
    this.toggleEdit();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        updatedText: ""
      });
    }
  }

  render() {
    const { id, name, birth, gender, handleRemove } = this.props;
    const { updatedName, updatedBirth, updatedGender } = this.state;
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
            <button onClick={this.toggleEdit}>Edit</button>
          </div>
        ) : (
          <div>
            <label>Name:</label>
            <input
              value={updatedName}
              onChange={e => this.handleChange("updatedName", e.target.value)}
            />
            <label>Birth:</label>
            <input
              value={updatedBirth}
              onChange={e => this.handleChange("updatedBirth", e.target.value)}
            />
            <label>Gender:</label>
            <input
              value={updatedGender}
              onChange={e => this.handleChange("updatedGender", e.target.value)}
            />
            <button onClick={this.handleSubmit}>Save</button>
          </div>
        )}
        <button onClick={() => handleRemove(id)}>Remove</button>
      </div>
    );
  }
}
export default Favorite;
