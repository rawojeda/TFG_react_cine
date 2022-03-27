import { JsxElement } from "typescript";



export function MoviesGrid(films: any): JSX.Element{
    //obviamente hay que cambiar el any del films y especidicar tanto en 
    //home como aquí el tipo de films(el array vaya)
    return (<div>
        <h1 className="titulo">Estrenos en España</h1>
        <ul className="moviesGrid">
          
        </ul>
      </div>);
}