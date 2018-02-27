import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <header className="App-header">
        <h1 className="App-title">Star Wars Characters</h1>
        <Link to="/">Character List</Link>
        <Link to="/favoritesList">Favorites List</Link>
      </header>
    </div>
  );
}
export default NavBar;