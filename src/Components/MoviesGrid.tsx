import React from "react";
import "./CSS/MoviesGrid.css";
import MovieCard from "./MovieCard";
import { FilmDescription } from "../Utils/interfaces";

interface IFilmsProps {
  films: Array<FilmDescription>;
}

class MoviesGrid extends React.Component<IFilmsProps, {}> {
  public render() {
    return (
      <ul className="moviesgrid">
        {this.props.films.map((element) => (
          <MovieCard film={element} key={element.id} />
        ))}
      </ul>
    );
  }
}
export default MoviesGrid;
