import React from "react";
import "../Images/images";
import { Link } from "react-router-dom";
import { FilmDescription } from "../Utils/interfaces";
import "./CSS/MovieCard.css";
import images from "../Images/images";

interface IMoviesCardProps {
  film: FilmDescription ;
}
interface IMoviesCardState {
  imageUrl: string;
}
class MovieCard extends React.Component<IMoviesCardProps, IMoviesCardState> {
  constructor(props: IMoviesCardProps) {
    super(props);
    this.state = {imageUrl: this.props.film.poster_path 
                            ? "https://image.tmdb.org/t/p/w400" + this.props.film.poster_path 
                            : images.placeholder};
   
  }

  public render() {
    return (
      <li className="movieCard">
        <Link to={"/Pelicula/" + this.props.film.id}>
        <img className="movieImage" src={this.state.imageUrl} width={230} height={345} alt={this.props.film.title}/>
        <div className="titles">{this.props.film.title}</div>
        </Link>
      </li>
    );
  }
}
export default MovieCard;
