import React, {Component} from "react";
import axios from "axios";

export default class Favorites extends component {
    constructor(props){
        super(props);

        this.state = {
            characterName: this.props.name,
            characterBirthYear: this.props.birth_year,
            characterHeight: this.props.height
        }
    }

    remder(){
        const {name, birthYear, height} = this.props;
        return(
            <button onClick={() => {
                axios.post("/api/favorites", {
                    name,
                    birthYear,
                    height
                })
                .then(res => {
                    console.log(res.data);
                    this.setState({character: res.data})
                })
            }}
                > Favorite </button>
        )
    }
}