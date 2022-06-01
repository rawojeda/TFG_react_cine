import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Navegador from "../Components/Navegador";
import Recomendations from "./Recomendations";
import {MovieViewer} from "./MovieViewer";
import { FilmData } from "./FilmData";
import Footer from "../Components/Footer";


interface IHomeStructureState {
  searchText: string;
}

class HomeStructure extends React.Component<
  {},
  IHomeStructureState
> {
  constructor(props: {}) {
    super(props);
    this.state = { searchText: ""};
  }

  public onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  public render() {
    return (
      <Router>
        <Navegador OnSearchTextChange={this.onSearchTextChange} />
        <div className="contenido">
          <Switch>
            <Route exact path="/">
              <Home color_button="red"/>
            </Route>
            <Route exact path="/Peliculas">
              <MovieViewer searchURL="https://api.themoviedb.org/3/discover/movie?page=" titulo="Listado de películas:" />
            </Route>
            <Route exact path={"/searcher/:searchName"}>
              <MovieViewer searchURL="https://api.themoviedb.org/3/search/movie?query=" titulo={"Resultados de la búsqueda:"} />
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
}
export default HomeStructure;
