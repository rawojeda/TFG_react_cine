import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import images from "../Images/images";
import { FaSearch,FaBars } from "react-icons/fa";
import MenuItems from "../Components/MenuItems";
import React from "react";

interface IHomeState {
  toggle_press: boolean;
  searchText: string;
}

class HomeStructure extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggle_press: false, searchText: ""};
  }

  public showitems = () => {
    this.setState({toggle_press: !!!this.state.toggle_press})
  };
  public onSearchTextChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({searchText: event.target.value});
  }
public render(){
  return (
    <Router>
      <div className="cabecera">
        <ul className="navegador">
          <li className="navegador-item-home">
            <Link className="links" to="/">
              <img src={images.popcorn} alt="popcorn"></img>
            </Link>
          </li>
          {/* {this.state.toggle_press ? <MenuItems estilo='menu1'/> : null}  */}
          <button className="navegador-items-toggle" onClick={this.showitems}>
            <FaBars/>
          </button>
          <MenuItems />
          <div className="search_and_profile">
            <form className="formulario-busqueda"> {/*antes era un form*/}
              <input
                type="text"
                className="Buscador"
                placeholder="Seven, Martin Escorsese..."
                value={this.state.searchText}
                onChange={this.onSearchTextChange}
              />
              <button className="search-button" type="submit">
                <FaSearch />
              </button>
            </form>
            <button className="profile-button" type="submit">
              <img
                className="profile-img"
                src={images.profile}
                alt="popcorn"
              ></img>
            </button>
          </div>
        </ul>
      </div>
      <div className="contenido">
        <Switch>
          <Route exact path="/">
            <Home collapsed={true} />
          </Route>
          <Route path="/">404</Route>
        </Switch>
      </div>
      <div className="pie_pagina">
        PIE DE PÁGINA
      </div>
    </Router>
  );
}
}
export default HomeStructure;