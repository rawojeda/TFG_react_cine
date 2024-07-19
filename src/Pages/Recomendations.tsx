import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collectionsget, Recommendsget } from "../Utils/BD_request";
import { Collection, Recomendations } from "../Utils/interfaces";
import "./CSS/Recomendations.css";
    
  export function Recomendation() {
    const URL_GETCOLLECTIONS = "http://localhost/bd-back/getCollection.php";
    const URL_GETRECOMMENDS = "http://localhost/bd-back/getRecommends.php";
    const [recommends, setRecommends] = useState<Recomendations[]>([]);

    const getCollections = async () => {
      const resp= await Collectionsget(URL_GETCOLLECTIONS);
      // para que en el caso de renderizar mas de una vez no se acumulen mas recomendaciones:
      resp.Collections.map(async (Collection:Collection) =>{
        const respRecommends= await Recommendsget(URL_GETRECOMMENDS, {CollectionId: Collection.CollectionId});
        const data: Recomendations = {CollectionData: Collection, Recomendations: respRecommends.Recommends};
        setRecommends(prev=>prev.concat(data));
      });
    }
    useEffect(() => {
      getCollections();
    }, [])
    
    return (
      <>
        <p className="recomends-title">RECOMENDACIONES:</p>
      {recommends.sort(recommend=>recommend.CollectionData.CollectionId).map((recommend)=>(
        <div key={recommend.CollectionData.CollectionId} className="recommend-div">
          <p className="title" > {recommend.CollectionData.CollectionName}: </p>
          <ul className="Sections" >
              {recommend.Recomendations.map((recomentation)=>(
                <Link key={recomentation.RecomendationId} className="section" to={"/Recomend/"+recomentation.RecomendationId}>{recomentation.Title}</Link>
              ))}
          </ul>
        </div>
      ))}
      </>
    );
  }
export default Recomendation;
