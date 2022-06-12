import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Utils/Api_get";
import { Recommendget } from "../Utils/BD_request";
import { filmData, FilmDescription, Recomendation, User } from "../Utils/interfaces";
import MoviesGrid from "../Components/MoviesGrid";
import { FaSadCry, FaSadTear } from "react-icons/fa";

interface recommendId {
  RecomendId: string;
}
export function RecomendationPage(props:{user:User}) {
  const RecommendId: recommendId = useParams();
  const URL_GETRECOMMEND = "http://localhost/bd-back/getRecommend.php";
  const [recommend, setRecommend] = useState<Recomendation>();
  const [films, setFilms] = useState<FilmDescription[]>([]);
  const [totalFilms, setTotalFilms] = useState<number>();

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
  const getrecommend = async () => {
    const respRecommends = await Recommendget(URL_GETRECOMMEND, {
      recomendationId: +RecommendId.RecomendId,
    });
    setRecommend(respRecommends.Recomendation);
    listado_peliculas(respRecommends.Recomendation.FilmsId);
  };
  useEffect(() => {
    getrecommend();
  }, []);

  return (
    <>
      <p className="title">{recommend?.Title}</p>
      <div className="film_list">
        {films.length === totalFilms? 
          <MoviesGrid user={props.user} films={films} page="recomendation"/> : <>
          <div className="filmdetail_box">
            <FaSadTear className="emote-visible"/><h3>Todavía no hay peliculas para esta sección.</h3> <FaSadCry className="emote-visible"/>
          </div></>}
      </div>
    </>
  );
}
