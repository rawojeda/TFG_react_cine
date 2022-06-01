import { Link } from "react-router-dom";
import React from "react";
import "./CSS/MenuItems.css";

class MenuItems extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="routes">
        <Link className="links" to="/Peliculas">
          Peliculas
        </Link>

        <Link className="links" to="/Reviews">
          Reviews
        </Link>

        <Link className="links" to="/Recomendaciones">
          Recomendaciones
        </Link>
      </div>
    );
  }
}
export default MenuItems;
