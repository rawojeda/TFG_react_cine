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
            <Link to={"/RecomendacionesAdmin/"} className="Option">Mis recomendaciones</Link>
          </>
        ) : null}
        <hr className="barra" />
        <button type="submit" className="btn-logout Option" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="pico-bocadillo"></div>
    </>
  );
}
