import "./CSS/UserOptions.css";
import { User } from "../Utils/interfaces";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

export function UserOptions(props: { userData:Function; user: User; close_profile:Function}) {
  const successAction = ()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Sesión cerrada correctamente",
      showConfirmButton: false,
      timer: 1500
    })
  }
    const handleLogout = () =>{
        //Vaciamos el usuario, cerramos sesión.
        props.userData({conectado:false, UserName:"", Password:"", Email: "", Admin: 0, UserId:0});
        const cookies = new Cookies();
        cookies.remove("User");
        //cerramos el div de profile.
        successAction();
        props.close_profile();

    }
  return (
    <>
      <div className="Options-area">
        <Link to={"/Listas/" + props.user.UserId} className="Option">
          Mis listas
        </Link>
        <hr className="barra" />
        <button type="submit" className="btn-logout Option" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="pico-bocadillo"></div>
    </>
  );
}
