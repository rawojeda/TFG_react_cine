import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { get } from "../Utils/Api_get";
import { Collectionsget, Recommendsget, Reviewsget } from "../Utils/BD_request";
import { filmData, Recomendations,Collection, Review, Reviews } from "../Utils/interfaces";
import "./CSS/Home.css";

export function Home() {
  // REVIEWS
  const URL_GETREVIEWS = "http://localhost/bd-back/getReviews.php";
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ImgPP, setImgPP] = useState<number[]>([0,1,2]);
  const [films, setFilms] = useState<filmData[]>([]);
  
  
  // RECOMENDATIONS CONTS
  const URL_GETCOLLECTIONS = "http://localhost/bd-back/getCollection.php";
  const URL_GETRECOMMENDS = "http://localhost/bd-back/getRecommends.php";
  const  [recommends, setRecommends] = useState<Recomendations[]>([]);
  const [recommendPP, setRecommendPP] = useState<number>(0);



  // REVIEWS
  const getreviews = async () => {
    const resp: Reviews = await Reviewsget(URL_GETREVIEWS);
    setReviews(resp.Reviews); 
    setFilms([]);
    resp.Reviews.map(async (review)=>{
      await get(
        "https://api.themoviedb.org/3/movie/" + review.FilmId + "?language=es-ES"
      ).then((data : filmData) => {
        setFilms(films=>films.concat(data));
      });
    });
  };
 
  function moveLeft(){
    if(ImgPP[0]===0){
      setImgPP([4,0,1]);
    }else if(ImgPP[1]===0){
      setImgPP([3,4,0]);
    }else if(ImgPP[2]===0){
      setImgPP([2,3,4]);
    }else {
      setImgPP([ImgPP[0]-1,ImgPP[1]-1,ImgPP[2]-1]);
    }
  }
  function moveRight(){
    if(ImgPP[0]===4){
      setImgPP([0,1,2]);
    }else if(ImgPP[1]===4){
      setImgPP([4,0,1]);
    }else if(ImgPP[2]===4){
      setImgPP([3,4,0]);
    }else {
      setImgPP([ImgPP[0]+1,ImgPP[1]+1,ImgPP[2]+1]);
    }
  }


  // RECOMENDACIONES
  const getCollections = async () => {
    const resp= await Collectionsget(URL_GETCOLLECTIONS);
    // para que en el caso de renderizar mas de una vez no se acumulen mas recomendaciones:
    resp.Collections.map(async (Collection:Collection) =>{
      const respRecommends= await Recommendsget(URL_GETRECOMMENDS, {CollectionId: Collection.CollectionId});
      const data: Recomendations = {CollectionData: Collection, Recomendations: respRecommends.Recommends};
      setRecommends(prev=>prev.concat(data));
    });
  }
  function nextRecommend(){
    setRecommendPP(recommendPP+1);
  }  
  function previusRecommend(){
    setRecommendPP(recommendPP-1);
  }  

  useEffect(() => {
    getreviews();
    getCollections();
  }, []);

  return (
    <div className="Home">
      {reviews.length ===5 && films.length===5 ?  (
        <>
        <div className="Notices-Carrousel">
            <p className="title-carrousel"> NOTICIAS:</p>
            <div className="container-PP-image">
              <button className="MoveButton-Left" onClick={moveLeft}><AiOutlineLeft/></button>
              <img className="Principal-img" src={"https://image.tmdb.org/t/p/w400"+films[ImgPP[0]].backdrop_path} alt={films[ImgPP[0]].title}/>
              <button className="MoveButton-Right" onClick={moveRight}><AiOutlineRight/></button>
              <p className="Carrousel-Filmname">{films[ImgPP[0]].title}</p>
              <p className="Carrousel-Notice-Title">{reviews[ImgPP[0]].Title}</p>
            </div>
            <div className="container-S-images">
              <div className="container-S-image">
                <img className="Secondary-img" src={"https://image.tmdb.org/t/p/w400"+films[ImgPP[1]].backdrop_path} alt={films[ImgPP[1]].title}/>
              </div>
              <div className="container-S-image">
                <img className="Secondary-img" src={"https://image.tmdb.org/t/p/w400"+films[ImgPP[2]].backdrop_path} alt={films[ImgPP[2]].title}/>
              </div>
            </div>
        </div>
        
        </>
      ) : null}
      {recommends.length>0 ?  (
      <>
        <div className="Recomendations">
          <div className="Recomendations-data">
            <p className="title" > Recomendaciones por {recommends[recommendPP].CollectionData.CollectionName}: </p>
            <ul className="Sections" >
                {recommends[recommendPP].Recomendations.map((recomentation)=>(
                  <Link key={recomentation.RecomendationId} className="section" to={"/Recomend/"+recomentation.RecomendationId}>{recomentation.Title}</Link>
                ))}
            </ul>
          </div>
          
          <div className= {recommendPP===0 ? "buttons-AfterBeforeOptions flex-str":recommendPP+1===recommends.length? "buttons-AfterBeforeOptions flex-nd" :"buttons-AfterBeforeOptions"}>
            {recommendPP!==0 ? <button className="SeeMore-Recomendations" onClick={previusRecommend}>ANTERIOR</button>: null}
            {recommendPP+1!==recommends.length? <button className="SeeMore-Recomendations" onClick={nextRecommend}>SIGUIENTE</button>:null}
          </div>
          
        </div>
      </> ): null}
    </div>
  );
}
