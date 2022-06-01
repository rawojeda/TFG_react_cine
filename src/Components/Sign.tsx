import React from "react";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import "./CSS/Sign.css";
import { GoSignIn} from "react-icons/go";


class Sign extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="Sign-area">
        <div className="Sign">
        <GoSignIn className="image-nav"/>
          <p>¿Ya tienes cuenta? Inicia Sesión:</p>

          <input
            type="text"
            className="div-input"
            placeholder="Usuario *"
          ></input>

          <input
            type="text"
            className="div-input"
            placeholder="Contraseña *"
          ></input>
          <button className="btn-continuar">Iniciar Sesión</button>
        </div>
        <div className="v-line"></div>
        <div className="Sign">
        <MdOutlineAssignmentReturned className="image-nav"/>
          <p>¿No tienes cuenta? Subscribirse:</p>

          <input
            type="text"
            className="div-input"
            placeholder="Usuario *"
          ></input>

          <input
            type="text"
            className="div-input"
            placeholder="Contraseña *"
          ></input>
          <input
            type="text"
            className="div-input"
            placeholder="Repetir Contraseña *"
          ></input>
          <label className="checkbx"><input type="checkbox" />¿Quieres recibir correos?</label>
          <button className="btn-continuar">Crear Cuenta</button>
        </div>
      </div>
    );
  }
}
export default Sign;
