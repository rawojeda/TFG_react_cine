import React, { useEffect, useState } from "react";
import "../Images/images";
import { Link, useHistory, useParams } from "react-router-dom";
import { FilmDescription, User } from "../Utils/interfaces";
import "./CSS/MovieCard.css";
import images from "../Images/images";
import { IoMdOptions } from "react-icons/io";
import Swal from "sweetalert2";
import { deleteFilmofList, ListaddToList } from "../Utils/BD_request";
import { AiFillDelete } from "react-icons/ai";

interface listData {
  userId: string;
  listName: string;
}
export function MovieCard(props: {
  film: FilmDescription;
  user: User;
  page: string;
}) {
  const urlData = useParams();
  const [optionsView, setoptionsView] = useState("no-display");
  const [deletebuttonView, setdeletebuttonView] = useState(false);
  const history = useHistory();

  const URL_ADDTOLIST = "http://localhost/bd-back/addtoList.php";
  const URL_DELETEFILMLIST = "http://localhost/bd-back/deletefromlist.php";

  const filmOptions = (e: any) => {
    e.preventDefault();
    if (optionsView === "no-display") {
      setoptionsView("more-height");
    } else {
      setoptionsView("no-display");
    }
  };

  // añadir peliculas a una lista
  const addToList = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Introduce el nombre de la lista",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!props.user.conectado) {
          Swal.fire({
            icon: "error",
            title: "No registrado",
            text: "Para guardar una pelicula en una lista hay que estar registrado!",
          });
        } else if (result.value !== "") {
          const resp = await ListaddToList(URL_ADDTOLIST, {
            userId: +props.user.UserId,
            listName: result.value,
            filmId: props.film.id,
          });
          Swal.fire(resp.mensaje);
        } else {
          Swal.fire({
            icon: "error",
            title: "Nombre vacío",
            text: "No has especificado ninguna lista!",
          });
        }
      }
    });
  };

  // borrar pelicula de la lista
  const DeleteForSure = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro?",
      text: "Una vez aceptado, no hay marcha atrás",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const ListData= urlData as listData;
        const resp = await deleteFilmofList(URL_DELETEFILMLIST, {
          userId: +ListData.userId,
          listName: ListData.listName,
          filmId: props.film.id
        });
        Swal.fire(resp.mensaje);
        history.push("/Listas/"+ListData.userId);
      }
    });
  };



  //en funcion de si estamos en lista o no se ofrece un servicio u otro
  useEffect(() => {
    if (props.page.includes("list")) {
      setdeletebuttonView(true);
    }
  }, []);

  const imageUrl = props.film.poster_path
    ? "https://image.tmdb.org/t/p/w400" + props.film.poster_path
    : images.placeholder;
  return (
    <li className="movieCard">
      <div className={"optionsView " + optionsView}>
        <button className="OptionView" onClick={(e) => addToList(e)}>
          añadir a lista
        </button>
      </div>
      {deletebuttonView ? (
        <button className="DeleteFilmListButton" onClick={(e)=> DeleteForSure(e)}>
          <AiFillDelete />
        </button>
      ) : null}
      <Link to={"/Pelicula/" + props.film.id}>
        <img
          className="movieImage"
          src={imageUrl}
          width={230}
          height={345}
          alt={props.film.title}
        />
        <div className="titles">{props.film.title}</div>
        {deletebuttonView ? null : (
          <button className="filmOptions" onClick={(e) => filmOptions(e)}>
            <IoMdOptions />
          </button>
        )}
      </Link>
    </li>
  );
}
