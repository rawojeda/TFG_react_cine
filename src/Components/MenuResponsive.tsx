import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuResponsive.css";
import SearchArea from "./Search_area";

interface IResponsiveMenuState {
  toggle_press: boolean;
}

class MenuResponsive extends React.Component<{}, IResponsiveMenuState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggle_press: false };
  }

  public showitems = () => {
    this.setState({ toggle_press: !!!this.state.toggle_press });
    console.log(this.state.toggle_press);
  };

  public render() {
    return (
      <ul className="Navegador-Desplegable">
        {/* links */}
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/Peliculas">
            Peliculas
          </Link>
        </li>
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/Reviews">
            Reviews
          </Link>
        </li>
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/Recomendaciones">
            Recomendaciones
          </Link>
        </li>

        {/* formulario de busqueda */}
        <li className="Navegador-desplegable-item">
          <SearchArea display="-ds-true" />
        </li>
      </ul>
    );
  }
}
export default MenuResponsive;
