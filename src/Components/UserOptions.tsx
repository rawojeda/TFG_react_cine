import "./CSS/UserOptions.css";
import { User } from "../Utils/interfaces";
import { Link } from "react-router-dom";

export function UserOptions(props: { userData:Function; user: User; close_profile:Function}) {
    const handleLogout = () =>{
        //Vaciamos el usuario, cerramos sesión.
        props.userData({conectado:false, UserName:"", Password:"", Email: "", Admin: 0, UserId:0});

        //cerramos el div de profile.
        props.close_profile();
    }
  return (
    <>
      <div className="Options-area">
        <>
          <Link to={"/Comentarios/" + props.user.UserId} className="Option">
            Mis opiniones
          </Link>
          <hr className="barra" />
        </>

        <Link to={"/Listas/" + props.user.UserId} className="Option">
          Mis listas
        </Link>

        {props.user.Admin === 1 ? (
          <>
            <hr className="barra" />
            <p className="Option">Mis recomendaciones</p>
          </>
        ) : null}
        <hr className="barra" />
        <button className="btn-logout Option" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="pico-bocadillo"></div>
    </>
  );
}
