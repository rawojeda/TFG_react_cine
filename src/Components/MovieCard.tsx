import React from "react";
import "./CSS/MovieCard.css";

interface IMoviesCardProps {
    film: Map<String,any>;
}
class MovieCard extends React.Component<IMoviesCardProps, {}> {
  constructor(props: IMoviesCardProps) {
    super(props);
  }

  public render() {
    return (
      <li className="film">
        {this.props.film.values}
      </li>
    );
  }
}
export default MovieCard;
