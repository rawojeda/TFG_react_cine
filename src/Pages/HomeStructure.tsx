import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import images from "../Images/images";
import { FaSearch } from "react-icons/fa";

export function HomeStructure(): JSX.Element {
  return (
    <Router>
      <div className="cabecera">
        <ul className="navegador">
          <li className="navegador-item">
            <Link className="links" to="/">
              <img src={images.popcorn} alt="popcorn"></img>
            </Link>
          </li>
          <li className="navegador-item">
            <Link className="links" to="/">
              Home2
            </Link>
          </li>
          <div className="div-formulario-busqueda">
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
          </div>
          <button className="profile-button" type="submit">
            <img className="profile-img" src={images.profile} alt="popcorn"></img>
          </button>
        </ul>
      </div>
      <div className="contenido">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">404</Route>
        </Switch>
      </div>
    </Router>
  );
}
