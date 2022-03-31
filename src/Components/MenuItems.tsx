import { Link } from "react-router-dom";
import { JsxElement } from "typescript";



export function MenuItems(): JSX.Element{
    //obviamente hay que cambiar el any del films y especidicar tanto en 
    //home como aquí el tipo de films(el array vaya)
    return (<><li className="navegador-item">
      <Link className="links" to="/">
        Films
      </Link>
    </li><li className="navegador-item">
        <Link className="links" to="/">
          Noticias
        </Link>
      </li><li className="navegador-item">
        <Link className="links" to="/">
          Recomendaciones
        </Link>
      </li></>);
}