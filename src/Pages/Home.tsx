import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "../Images/images";
import { get } from "../Utils/Api_get";
import { Collectionsget, Recommendsget, Reviewsget } from "../Utils/BD_request";
import { filmData, Recomendations,Collection, Review, Reviews } from "../Utils/interfaces";
import "./CSS/Home.css";

export function Home() {
  // REVIEWS
  const URL_GETREVIEWS = "http://localhost/bd-back/getReviews.php";
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ImgPP, setImgPP] = useState<number[]>([0,1,2,3,4]);
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
    var imgpp:number[] = [];
    ImgPP.map((img)=>{
      if(img===0){
        imgpp.push(4);
      }else{
        imgpp.push(img-1);
      }
      setImgPP(imgpp);
    });
  }
  function moveRight(){
    var imgpp:number[] = [];
    ImgPP.map((img)=>{
      if(img===4){
        imgpp.push(0);
      }else{
        imgpp.push(img+1);
      }
      setImgPP(imgpp);
    });
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
      <div className="Introduction-self-container">
          <div className="Introduction-self-text">
            <h1 className="Welcome-text">BIENVENIDO</h1>
            <h3 className="description-introductions">A UN ENTORNO DONDE:</h3>
            <div className="description-div">
              <div className="description-div-left">
                <li className="description-introduction">Compartir <strong>opiniones.</strong></li>
                <li className="description-introduction">Descubrir nuevas <strong>cintas.</strong></li>
              </div>
              <div className="description-div-right">
                <li className="description-introduction">Conocer opiniones.</li>
                <li className="description-introduction">Crear/Organizar tu propio repositorio de películas..</li>
              </div>
            </div>
          </div>
          <div className="Introduccion-self-image">
            <img className="image-logo-introductionself" src={images.logo3} alt="logo"/>
          </div>
      </div>
      {reviews.length ===5 && films.length===5 ?  (
        <>
         <div className="Notices-Carrousel">
            <p className="title-carrousel"> NOVEDADES: </p>
            <div className="container-PP-image">
              <button className="MoveButton-Left" onClick={moveLeft}><AiOutlineLeft/></button>
              <img className="Principal-img" src={reviews[ImgPP[0]].ImageUrl} alt={films[ImgPP[0]].title}/>
              <button className="MoveButton-Right" onClick={moveRight}><AiOutlineRight/></button>
              <Link className="Carrousel-Notice-Title" to={"/Review/"+ reviews[ImgPP[0]].FilmId}>{reviews[ImgPP[0]].Title}</Link>
              <Link className="Carrousel-Notice-Resume" to={"/Review/"+ reviews[ImgPP[0]].FilmId}> {reviews[ImgPP[0]].Resumen} </Link>
            </div>
            <div className="container-S-images">
              <Link className="container-S-image" to={"/Review/"+ reviews[ImgPP[1]].FilmId}>
                <img className="Secondary-img" src={reviews[ImgPP[1]].ImageUrl} alt={films[ImgPP[1]].title}/>
                <p className="Carrousel-Secondary-Notice-Title" >{reviews[ImgPP[1]].Title}</p>
              </Link>
              <Link className="container-S-image" to={"/Review/"+ reviews[ImgPP[2]].FilmId}>
                <img className="Secondary-img" src={reviews[ImgPP[2]].ImageUrl} alt={films[ImgPP[2]].title}/>
                <p className="Carrousel-Secondary-Notice-Title">{reviews[ImgPP[2]].Title}</p>
              </Link>
              <Link className="container-S-image" to={"/Review/"+ reviews[ImgPP[3]].FilmId}>
                <img className="Secondary-img" src={reviews[ImgPP[3]].ImageUrl} alt={films[ImgPP[3]].title}/>
                <p className="Carrousel-Secondary-Notice-Title" >{reviews[ImgPP[3]].Title}</p>
              </Link>
              <Link className="container-S-image" to={"/Review/"+ reviews[ImgPP[4]].FilmId}>
                <img className="Secondary-img" src={reviews[ImgPP[4]].ImageUrl} alt={films[ImgPP[4]].title}/>
                <p className="Carrousel-Secondary-Notice-Title">{reviews[ImgPP[4]].Title}</p>

              </Link>
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
          
          <div className= {recommendPP===0 ? "buttons-AfterBeforeOptions flex-nd":recommendPP+1===recommends.length? "buttons-AfterBeforeOptions flex-str" :"buttons-AfterBeforeOptions"}>
            {recommendPP!==0 ? <button className="SeeMore-Recomendations" onClick={previusRecommend}>ANTERIOR</button>: null}
            {recommendPP+1!==recommends.length? <button className="SeeMore-Recomendations" onClick={nextRecommend}>SIGUIENTE</button>:null}
          </div>
          
        </div>
      </> ): null}
    </div>
  );
}
