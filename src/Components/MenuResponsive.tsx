import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuResponsive.css";
import SearchArea from "./Search_area";

interface IResponsiveMenuProps{
  OnSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IResponsiveMenuState {
  toggle_press: boolean;

}

class MenuResponsive extends React.Component<IResponsiveMenuProps, IResponsiveMenuState> {
  constructor(props: IResponsiveMenuProps) {
    super(props);
    this.state = { toggle_press: false};
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
          <SearchArea OnSearchTextChange={this.props.OnSearchTextChange} display="-ds-true" />
        </li>
      </ul>
      
    );
  }
}
export default MenuResponsive;
