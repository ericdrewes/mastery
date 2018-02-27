
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Character from "./components/charactersList/charactersList";
import Favorites from "./components/favoritesList/favoritesList";
import NavBar from "./components/navbar/navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Character} />
          <Route path="/favoritesList" component={Favorites} />
        </Switch>
      </div>
    );
  }
}

export default App;
