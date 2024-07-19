import { Link, useLocation } from "react-router-dom";
import images from "../Images/images";
import './CSS/NotFound.css';
export function NotFound() {
    const isSearch = useLocation();
    return (
    <div className="NotFound">
        {isSearch.pathname.includes('searcher')?<h1>NO SE ESCRIBIÓ NINGUNA BÚSQUEDA</h1>:<h1>NO SE ENCONTRÓ LA PÁGINA QUE BUSCAS</h1>}
        <img src={images.notfoundgif} alt="not found"></img>
        <Link className="NotFoundButton" to={"/"}>Volver a inicio</Link>
    </div>
    );
}