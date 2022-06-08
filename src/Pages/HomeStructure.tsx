import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import React, { useEffect, useState } from "react";
import {Navegador} from "../Components/Navegador";
import Recomendations from "./Recomendations";
import { MovieViewer } from "./MovieViewer";
import { FilmData } from "./FilmData";
import Footer from "../Components/Footer";
import { User } from "../Utils/interfaces";
import { Lists } from "./Lists";
import { RecomendationActions } from "./RecomendationActions";
import { Reviewss } from "./Reviews";

export function HomeStructure() {
  const [user, setUser] = useState<User>({conectado:false, UserName:"", Password:"", Email: "", Admin: 0, UserId:0});
  const [token, setToken] = useState<string>();
  
  const userData = (user: User) => {
    setUser(user);
  };
  const tokenData = (token: string) =>{
    setToken(token);
  }
  useEffect(() => {
    console.log(user);
  }, [user,token])
  
    return (
      <Router>
        <Navegador userData={userData} tokenData={tokenData} user={user}/>
        <div className="contenido">
          <Switch>
            <Route exact path="/">
              <Home/>
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
              <Reviewss/>
            </Route>
            <Route exact path="/Recomendaciones">
              <Recomendations />
            </Route>
            <Route exact path="/Pelicula/:peliculaId">
              <FilmData user={user}/>
            </Route>
            <Route exact path="/Listas/:userId">
              {user.conectado ? <Lists/>: <Redirect to={"/"}/>}
            </Route>
            <Route exact path="/RecomendacionesAdmin">
              {user.conectado&&(user.Admin===1) ? <RecomendationActions/>: <Redirect to={"/"} />}
            </Route>
            <Route path="/">404</Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
}
export default HomeStructure;
