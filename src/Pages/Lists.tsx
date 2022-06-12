import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteList, Listadd, Listsget } from "../Utils/BD_request";
import { FilmLists } from "../Utils/interfaces";
import { MdAddBox } from "react-icons/md";
import "./CSS/Lists.css";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { FaSadCry, FaSadTear } from "react-icons/fa";

interface UserId {
  userId: string;
}

export function Lists() {
  const userid: UserId = useParams();
  const URL_GETLISTS = "http://localhost/bd-back/getLists.php";
  const URL_ADDLIST = "http://localhost/bd-back/newList.php";
  const URL_DELETELIST = "http://localhost/bd-back/deleteList.php";

  const [lists, setLists] = useState<FilmLists[]>([]);
  const [listsChange, setListsChange] = useState(false);

  const getlists = async () => {
    const resp = await Listsget(URL_GETLISTS, { userId: +userid.userId });
    setLists(resp.Lists);
  };
  useEffect(() => {
    getlists();
  }, [listsChange]);

  // añadir y borrar listas
  const addList = () => {
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
        if (result.value !== "") {
          const resp = await Listadd(URL_ADDLIST, {
            userId: +userid.userId,
            listName: result.value,
          });
          setListsChange(!!!listsChange);
          Swal.fire(resp.mensaje);
        } else {
          Swal.fire({
            icon: "error",
            title: "Nombre vacío",
            text: " El nombre de la lista no puede estar vacío!",
          });
        }
      }
    });
  };

  const DeleteForSure = (e: any, Namelist: string) => {
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
        const resp = await deleteList(URL_DELETELIST, {
          userId: +userid.userId,
          listName: Namelist,
        });
        setListsChange(!!!listsChange);
        Swal.fire(resp.mensaje);
      }
    });
  };

  return (
    <>
      {lists.length > 0 ? (
        <>
          <p className="Listtitle">Tus listas:</p>

          <ul className="Lists">
            <button className="AddListButton" onClick={addList}>
              <MdAddBox />
            </button>

            {lists.map((list) => (
              <>
                <Link
                  key={list.ListId}
                  className="List"
                  to={"/Lists/" + list.UserId + "/" + list.ListName}
                >
                  {list.ListName}
                  <button
                    className="DeleteListButton"
                    onClick={(e) => DeleteForSure(e, list.ListName)}
                  >
                    <AiFillDelete />
                  </button>
                </Link>
              </>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="filmdetail_box">
            <FaSadTear className="emote-visible" />
            <div className="Firstlist">
              {" "}
              <h3>Todavía no tienes ninguna lista:</h3>{" "}
              <button className="AddFirstListButton" onClick={addList}>
                CREAR LISTA
              </button>
            </div>{" "}
            <FaSadCry className="emote-visible" />
          </div>
        </>
      )}
    </>
  );
}
