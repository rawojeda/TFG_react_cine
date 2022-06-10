import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Utils/Api_get";
import { Recommendget } from "../Utils/BD_request";
import { FilmDescription } from "../Utils/interfaces";

interface recommendId{
  RecomendId:string;
}
export function RecomendationPage(){
    const RecommendId: recommendId = useParams();
    const URL_GETRECOMMEND = "http://localhost/bd-back/getRecommend.php";
    const [recommend,setRecommend] = useState();
    
    function listado_peliculas(peliculas: string){
        const films_string:string[] = peliculas.replaceAll(" ", "").split(",");
        var films: FilmDescription[] = [];
        films_string.map((movie)=>{
          get("https://api.themoviedb.org/3/movie/" + movie+"?language=es-ES").then(
            (data) => {
              films.push(data);
            }
          );
        })
        return films;
      }
      const getrecommend = async () => {
        const respRecommends= await Recommendget(URL_GETRECOMMEND, {recomendationId: +RecommendId.RecomendId});
        setRecommend(respRecommends.Recomendation);
      };
      useEffect(() => {
        getrecommend();
      },[])

    return <div>Aqui saldran las recomendaciones</div>
}