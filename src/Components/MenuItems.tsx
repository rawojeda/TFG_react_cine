import { Link } from "react-router-dom";
import React from "react";


class MenuItems extends React.Component<{}, {}> {
  public render(){
    return <>
    <li className="navegador-item">
      <Link className="links" to="/">
        Peliculas
      </Link>
    </li>
    <li className="navegador-item">
      <Link className="links" to="/">
        Noticias
      </Link>
    </li>
    <li className="navegador-item">
      <Link className="links" to="/">
        Recomendaciones
      </Link>
    </li>
  </>;
  }
}
export default MenuItems;

