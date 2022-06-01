/* eslint-disable react-hooks/exhaustive-deps */
import MoviesGrid from "../Components/MoviesGrid";
import React, { useEffect, useState } from "react";
import { get } from "../Utils/Api_get";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../Components/Spinner";
import "./CSS/MovieViewer.css";
import { dataType, FilmDescription } from "../Utils/interfaces";
import {useLocation } from "react-router-dom";

export function MovieViewer(props: {
  searchURL: string;
  titulo: string;
}) {
  const [films, setfilms] = useState<FilmDescription[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [primeraVez, setPrimeraVez] = useState(true);
  const location = useLocation().pathname;
 
  useEffect(() => {
    //caso nueva búsqueda
    if(!primeraVez && page===1 ){
      // caso busqueda avengers, titanic(ya que al no funcionar setpage no iría a useefect page)
      const searchURL = props.searchURL.includes("query") 
      ? props.searchURL + location.replace("/searcher/","") +"&page=" + page
      : props.searchURL + page;
      get(searchURL).then((data: dataType) => {
        setfilms(data.results);
        setHasMore(data.page < data.total_pages);
      })
    }
      //caso avengers, avengers_page_2, titanic 
      setPage(1); 
  }, [location]);

  useEffect(() => {
    const searchURL = props.searchURL.includes("query") 
      ? props.searchURL + location.replace("/searcher/","") +"&page=" + page
      : props.searchURL + page;
      
    get(searchURL).then((data: dataType) => {
        if(page===1 ){
          setfilms(data.results);
          setPrimeraVez(false);
        }else{
          setfilms((prevFilms) =>
          prevFilms.concat(data.results)
        );
      }
      setHasMore(data.page < data.total_pages);
    });
    
  }, [page]);
  return (
    <>
      <p className="title">{props.titulo}</p>
      <div className="film_list">
        <InfiniteScroll
          dataLength={films.length}
          hasMore={hasMore}
          next={() => {
            setTimeout(function () {
              setPage((prevPage) => prevPage + 1);
            }, 2000);
          }}
          loader={<Spinner />}
        >
          <MoviesGrid films={films} />
        </InfiniteScroll>
      </div>
    </>
  );
}
