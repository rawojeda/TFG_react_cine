import React from "react";
import MovieCard from "../Components/MovieCard";
import { get } from "../Utils/Api_get";
import "./CSS/New_Films.css";

interface INew_filmsState {
  films: Array<Map<String, any>> ;
}
class New_films extends React.Component<{}, INew_filmsState> {
  constructor(props: {}) {
    super(props);
    const searchURL = "https://api.themoviedb.org/3/discover/movie?page=";
    let mapa: Array<Map<String, any>> = [];
    get(searchURL).then((data) => {
      data.results.forEach((element: Map<String, any>) => {
        mapa.push(element);
      });
      // // asi estaria bien
      // this.state = { films: mapa };
      // console.log(this.state.films);
    });
      this.state = { films: mapa };
      console.log(this.state.films);
  }

  public render() {
    return (
      <>
        <p className="title">Nuevas Películas</p>
        <ul className="moviesgrid">
            {/* {this.state.films.map((element) => (
              <li>elemento</li>
            ))} */}
        </ul>
      </>
    );
  }
}
export default New_films;
