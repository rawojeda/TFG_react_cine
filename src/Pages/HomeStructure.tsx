import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {Home} from "./Home";
import React, { useEffect, useState } from "react";
import {Navegador} from "../Components/Navegador";
import { Recomendation } from "./Recomendations";
import { MovieViewer } from "./MovieViewer";
import { FilmData } from "./FilmData";
import Footer from "../Components/Footer";
import { User } from "../Utils/interfaces";
import { Lists } from "./Lists";
import { Reviewss } from "./Reviews";
import { ReviewDetail } from "./ReviewDetail";
import { RecomendationPage } from "../Components/RecomendationPage";
import { ListPage } from "./ListPage";
import { NotFound } from "./NotFound";
import Cookies from "universal-cookie";
import { getUserWithCookie } from "../Utils/BD_request";

export function HomeStructure() {
  const [user, setUser] = useState<User>({conectado:false, UserName:"", Password:"", Email: "", Admin: 0, UserId:0});
  const URL_GETUSER = "http://localhost/bd-back/getUser.php";

  const userData = (user: User) => {
    setUser(user);
  };

  const getCookieUser = async (cookieUser:string) =>{
    const resp= await getUserWithCookie(URL_GETUSER,{username:cookieUser});
    const user_data: User = resp;
    setUser(user_data);
  }
  useEffect(() => {
    const cookies = new Cookies();
    if(!user.conectado){
      const cookieUser:string= cookies.get('User');
      if(cookieUser!==undefined){
        getCookieUser(cookieUser);
      }
    }
    console.log(user);
  }, [user])
  
    return (
      <Router>
        <Navegador userData={userData} user={user}/>
        <div className="contenido">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/Peliculas">
              <MovieViewer
                searchURL="https://api.themoviedb.org/3/discover/movie?page="
                titulo="Listado de películas:" user={user}              />
            </Route>
            <Route exact path={"/searcher/:searchName"}>
              <MovieViewer
                searchURL="https://api.themoviedb.org/3/search/movie?query="
                titulo="Resultados de la búsqueda:" user={user}              />
            </Route>
            <Route exact path="/Reviews">
              <Reviewss/>
            </Route>
            <Route exact path="/Recomendaciones">
              <Recomendation />
            </Route>
            <Route exact path="/Review/:filmId">
              <ReviewDetail/>
            </Route>
            <Route exact path="/Recomend/:RecomendId">
              <RecomendationPage user={user}/>
            </Route>
            <Route exact path="/Lists/:userId/:listName">
              {user.conectado ? <ListPage user={user}/>: <Redirect to={"/"}/>}
            </Route>
            <Route exact path="/Pelicula/:peliculaId">
              <FilmData user={user}/>
            </Route>
            <Route exact path="/Listas/:userId">
              {user.conectado ? <Lists/>: <Redirect to={"/"}/>}
            </Route>
            <Route path="/"><NotFound/></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
}
export default HomeStructure;
