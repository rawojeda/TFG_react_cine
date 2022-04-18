import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuResponsive.css";
import { FaBars, FaSearch } from "react-icons/fa";

interface IResponsiveMenuProps{
  OnSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IResponsiveMenuState {
  toggle_press: boolean;
  searchText: string;
}

class MenuResponsive extends React.Component<IResponsiveMenuProps, IResponsiveMenuState> {
  constructor(props: IResponsiveMenuProps) {
    super(props);
    this.state = { toggle_press: false, searchText: "" };
  }

  public showitems = () => {
    this.setState({ toggle_press: !!!this.state.toggle_press });
    console.log(this.state.toggle_press);
  };
  public OnSearchTextChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.OnSearchTextChange(event);
    this.setState({searchText: event.target.value});
  }
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
          <Link className="links" to="/Noticias">
            Noticias
          </Link>
        </li>
        <li className="Navegador-desplegable-item">
          <Link className="links" to="/Recomendaciones">
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
              onChange={this.OnSearchTextChangeInternal}
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
