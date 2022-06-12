import React from "react";
import "./CSS/MoviesGrid.css";
import {MovieCard} from "./MovieCard";
import { FilmDescription, User } from "../Utils/interfaces";

interface IFilmsProps {
  films: Array<FilmDescription>;
  user: User;
  page: string;
}

class MoviesGrid extends React.Component<IFilmsProps, {}> {
  public render() {
    return (
      <ul className="moviesgrid">
        {this.props.films.map((element) => (
          <MovieCard film={element} key={element.id} user={this.props.user} page={this.props.page} />
        ))}
      </ul>
    );
  }
}
export default MoviesGrid;
