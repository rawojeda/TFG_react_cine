import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuResponsive.css";
import { FaBars, FaSearch } from "react-icons/fa";

interface IHomeState {
  toggle_press: boolean;
  searchText: string;
}

class MenuResponsive extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggle_press: false, searchText: "" };
  }

  public showitems = () => {
    this.setState({ toggle_press: !!!this.state.toggle_press });
    console.log(this.state.toggle_press);
  };
  public onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
    console.log(this.state.searchText);
  };
  public render() {
    return (
      <ul className="Navegador-Desplegable">
        {/* links */}
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/">
            Peliculas
          </Link>
        </li>
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/">
            Noticias
          </Link>
        </li>
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/">
            Recomendaciones
          </Link>
        </li>

        {/* formulario de busqueda */}
        <li className="Navegador-desplegable-item">
          <div className="formulario-busqueda-desplegable">
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
          </div>
        </li>
      </ul>
    );
  }
}
export default MenuResponsive;
