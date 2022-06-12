import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Utils/Api_get";
import { Listget} from "../Utils/BD_request";
import { FilmDescription, FilmLists, User} from "../Utils/interfaces";
import MoviesGrid from "../Components/MoviesGrid";
import { FaSadCry, FaSadTear } from "react-icons/fa";

interface listData {
    userId: string;
    listName: string;
}

export function ListPage(props:{user:User}) {
  const ListData: listData = useParams();
  const URL_GETLISTS = "http://localhost/bd-back/getList.php";

  const [films, setFilms] = useState<FilmDescription[]>([]);
  const [totalFilms, setTotalFilms] = useState<number>();
  const [listtitle, setlisttitle] = useState("");

  function listado_peliculas(peliculas: string) {
    const films_string: string[] = peliculas.replaceAll(" ", "").split(",");
    setTotalFilms(films_string.length);
    films_string.map((movie) => {
      get(
        "https://api.themoviedb.org/3/movie/" + movie + "?language=es-ES"
      ).then((data: FilmDescription) => {
        setFilms((prev) => prev.concat(data));
      }); 
    });   
  }
  const getlist = async () => {
    const respLists = await Listget(URL_GETLISTS, {listName: ListData.listName, userId: ListData.userId});
    if(respLists.List.FilmsId!==""){listado_peliculas(respLists.List.FilmsId);}
    setlisttitle(respLists.List.ListName);
  };
  useEffect(() => {
    getlist();
  }, []);

  return (
    <>
      <p className="title">{listtitle}</p>
      <div className="film_list">
        {films.length === totalFilms?  
           <MoviesGrid films={films} user={props.user} page="list"/> : <>
          <div className="filmdetail_box">
            <FaSadTear className="emote-visible"/><h3>Todavía no hay peliculas para esta lista.</h3> <FaSadCry className="emote-visible"/>
          </div>
          </>}
      </div>
    </>
  );
}
