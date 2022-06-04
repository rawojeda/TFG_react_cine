import React, { useRef, useState } from "react";
import "./CSS/Sign.css";
import { FaUserCheck, FaUserEdit } from "react-icons/fa";
import { ErrorHanding } from "../Utils/ErrorHanding";
import { Login_bd, Signin_bd } from "../Utils/Sign";

const URL_LOGIN = "http://localhost/bd-back/login.php";
const URL_SIGNIN = "http://localhost/bd-back/signin.php";



export function Sign(props: { acceder: Function }) {
  const User_login = useRef<HTMLInputElement>(null);
  const Pass_login = useRef<HTMLInputElement>(null);
  const User_signin = useRef<HTMLInputElement>(null);
  const Pass_signin = useRef<HTMLInputElement>(null);
  const Pass_signin_repeat = useRef<HTMLInputElement>(null);
  const Email_signin = useRef<HTMLInputElement>(null);

  const [errorSignin, setErrorSignin] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const [espera, setEspera] = useState(false);
  const [errorinputemail,seterrorinputemail] = useState("");
  const [errorinputpass,seterrorinputpass] = useState("");
  const [errorinputrepeatedpass,seterrorinputrepeatedpass] = useState("");
  // Inicio de sesion de usuario, peticion a la base de datos
  const handleLogin = async () => {
    setEspera(true);
    const data = {
      //si el usuario o la contraseña esta vacio, que devuelva "", tambien se podría poner User_login: string|undefined
      username: User_login? User_login.current ? User_login.current.value? User_login.current.value: "": "": "",
      pass: Pass_login? Pass_login.current? Pass_login.current.value? Pass_login.current.value: "": "": ""
    };
    const resp = await Login_bd(URL_LOGIN, data);
    
    props.acceder(resp.conectado);
    setErrorLogin(resp.error);
    setEspera(false);
  };

  // registro de usuario, peticion a la base de datos
  const handleSignin = async () => {
    setEspera(true);
    const data = {
      //si el usuario o la contraseña esta vacio, que devuelva ""
      username: User_signin? User_signin.current? User_signin.current.value? User_signin.current.value: "": "": "",
      pass: Pass_signin? Pass_signin.current? Pass_signin.current.value? Pass_signin.current.value: "": "": "",
      email: Email_signin? Email_signin.current? Email_signin.current.value? Email_signin.current.value: "": "": ""
    };
    const resp = await Signin_bd(URL_SIGNIN, data);
    setErrorSignin(resp.error);
    setEspera(false);
  };
  const emailValidation = (event: React.ChangeEvent<HTMLInputElement>) => {

    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)/;
    if(event.target.value.match(email_re)){
      seterrorinputemail("valid");
    }else{
      seterrorinputemail("not-valid");
    }
  };
  const passValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)/;
    if(event.target.value.match(email_re)){
      seterrorinputemail("valid");
    }else{
      seterrorinputemail("not-valid");
    }
  };
  const repeatedpassValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)/;
    if(event.target.value.match(email_re)){
      seterrorinputemail("valid");
    }else{
      seterrorinputemail("not-valid");
    }
  };
  return (
    <>
      <div className="Sign-area">
        {/* Login */}
        <form className="Sign">
          <FaUserCheck className="image-nav-sign" />
          <p>¿Ya tienes cuenta? Inicia Sesión:</p>
              <input
                type="text"
                className="div-input"
                placeholder="Usuario *"
                ref={User_login}
              ></input>
              <input
                type="password"
                className="div-input"
                placeholder="Contraseña *"
                ref={Pass_login}
              ></input>
              <button
                onClick={handleLogin}
                disabled={espera}
                className={
                  espera ? "btn-continuar button-canceled" : "btn-continuar"
                }
              >
                Iniciar Sesión
              </button>
          
              {errorLogin && 
              <div className="alert alert-danger">
                {errorLogin}
              </div>
              }
        </form>       

        <div className="v-line"></div>

         {/* registro de usuario */}
        <form className="Sign">
          <FaUserEdit className="image-nav-sign" />
          <p>¿No tienes cuenta? Subscribirse:</p>

          <input
            type="text"
            className="div-input"
            placeholder="Usuario *"
            ref={User_signin}
          ></input>
          <input
            type="text"
            className={"div-input " + errorinputemail}
            placeholder="email *"
            ref={Email_signin}
            onChange={emailValidation}
          ></input>

          <input
            type="password"
            className="div-input"
            placeholder="Contraseña *"
            ref={Pass_signin}
            onChange={passValidation}
          ></input>
          <input
            type="password"
            className="div-input"
            placeholder="Repetir Contraseña *"
            ref={Pass_signin_repeat}
            onChange={repeatedpassValidation}
          ></input>
          <button 
            onClick={handleSignin}
            disabled={espera}
            className={
              espera ? "btn-continuar button-canceled" : "btn-continuar"
            }>
            Crear Cuenta
          </button>
          {errorSignin && 
            <div className="alert alert-danger ">
              {errorSignin}
            </div>
          }
        </form>
      </div>
      <div className="pico-bocadillo"></div>
    </>
  );
}
