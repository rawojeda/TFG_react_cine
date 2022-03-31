import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import images from "../Images/images";
import { FaSearch,FaBars } from "react-icons/fa";
import {MenuItems} from "../Components/MenuItems";
import { useEffect, useState } from "react";


export function HomeStructure(): JSX.Element {
  const [toggle_a, setToggle_a]= useState(false);
  const showitems= () => setToggle_a(!!!toggle_a);
  useEffect(() => {
   console.log(toggle_a);
  }, [toggle_a])
  
  return (
    <Router>
      <div className="cabecera">
        <ul className="navegador">
          <li className="navegador-item-home">
            <Link className="links" to="/">
              <img src={images.popcorn} alt="popcorn"></img>
            </Link>
          </li>
          <button className="navegador-items-toggle" onClick={showitems}>
            <FaBars/>
          </button>
          <MenuItems/>
          <div className="search_and_profile">
            <form className="formulario-busqueda">
              <input
                type="text"
                className="Buscador"
                placeholder="Seven, Martin Escorsese..."
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
    </Router>
  );
}
