import React from "react";
import MovieCard from "../Components/MovieCard";
import { get } from "../Utils/Api_get";
import { FilmDescription, dataType } from "../Utils/interfaces";
import "./CSS/New_Films.css";

interface INewFilmsState {
  films: Array<FilmDescription> ;
}

class New_films extends React.Component<{}, INewFilmsState> {
  constructor(props: {}) {
    super(props);
    this.state= {films: []};
  }
  public componentDidMount(){
    const searchURL = "https://api.themoviedb.org/3/discover/movie?page=";
    get(searchURL).then((data: dataType) => {
      this.setState({films: data.results});
    });
  }

  public render() {
    return (
      <>
        <p className="title">Nuevas Películas</p>
        <ul className="moviesgrid">
          {this.state.films.map((element) => (
              <MovieCard film={element} key={element.id}/>
            ))}
        </ul>
      </>
    );
  }
}
export default New_films;
