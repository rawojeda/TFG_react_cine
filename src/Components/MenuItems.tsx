import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuItems.css";

class MenuItems extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="routes">
        <Link className="links" to="/">
          Peliculas
        </Link>

        <Link className="links" to="/">
          Noticias
        </Link>

        <Link className="links" to="/">
          Recomendaciones
        </Link>
      </div>
    );
  }
}
export default MenuItems;
