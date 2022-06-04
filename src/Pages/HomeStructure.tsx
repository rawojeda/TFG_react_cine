import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import React, { useState } from "react";
import {Navegador} from "../Components/Navegador";
import Recomendations from "./Recomendations";
import { MovieViewer } from "./MovieViewer";
import { FilmData } from "./FilmData";
import Footer from "../Components/Footer";

export function HomeStructure() {

  const [conectado, setConectado] = useState(false);

  const acceder = (estado: boolean) => {
    setConectado(estado);
  };

    return (
      <Router>
        <Navegador acceder={acceder}/>
        <div className="contenido">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Peliculas">
              <MovieViewer
                searchURL="https://api.themoviedb.org/3/discover/movie?page="
                titulo="Listado de películas:"
              />
            </Route>
            <Route exact path={"/searcher/:searchName"}>
              <MovieViewer
                searchURL="https://api.themoviedb.org/3/search/movie?query="
                titulo="Resultados de la búsqueda:"
              />
            </Route>
            <Route exact path="/Reviews">
              Reviews
            </Route>
            <Route exact path="/Recomendaciones">
              <Recomendations />
            </Route>
            <Route exact path="/Pelicula/:peliculaId">
              <FilmData />
            </Route>
            <Route path="/">404</Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
}
export default HomeStructure;
