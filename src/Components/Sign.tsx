import React, { useRef, useState } from "react";
import "./CSS/Sign.css";
import { FaUserCheck, FaUserEdit } from "react-icons/fa";
import { emailValidation, equal, erroresSigninCliente, passValidation, repeatedpassValidation } from "../Utils/ErrorHanding";
import { Login_bd, Signin_bd } from "../Utils/Sign";
import { User } from "../Utils/interfaces";
// import jwt  from "jsonwebtoken";


const URL_LOGIN = "http://localhost/bd-back/login.php";
const URL_SIGNIN = "http://localhost/bd-back/signin.php";



export function Sign(props: { userData: Function; tokenData:Function, close_profile: Function}) {
  //errores servidor
  const User_login = useRef<HTMLInputElement>(null);
  const Pass_login = useRef<HTMLInputElement>(null);
  const User_signin = useRef<HTMLInputElement>(null);
  const Pass_signin = useRef<HTMLInputElement>(null);
  const Repeatedpass_signin = useRef<HTMLInputElement>(null);
  const Email_signin = useRef<HTMLInputElement>(null);
  const [errorSignin, setErrorSignin] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);

  const [esperaLogin, setEsperaLogin] = useState(false);
  const [esperaSignin, setEsperaSignin] = useState(false);

  //errores durante el escrito del Signin
  const [passSignin, setPassSignin] = useState("");  
  const [errorinputemail, seterrorinputemail] = useState("");
  const [errorinputpass, seterrorinputpass] = useState("");
  const [errorinputrepeatedpass, seterrorinputrepeatedpass] = useState("");

  //errores cliente
  const [erroresCliente,setErroresCliente] = useState<string[]>([]);

  // Inicio de sesion de usuario, peticion a la base de datos.
  const handleLogin = async (e:any) => {
    e.preventDefault();
    setEsperaLogin(true);
    const data = {
      //si el usuario o la contraseña esta vacio, que devuelva "", tambien se podría poner User_login: string|undefined.
      username: User_login? User_login.current ? User_login.current.value? User_login.current.value: "": "": "",
      pass: Pass_login? Pass_login.current? Pass_login.current.value? Pass_login.current.value: "": "": ""
    };
    const resp = await Login_bd(URL_LOGIN, data);

    //recogemos los errores de la base de datos.
    setErrorLogin(resp.error);
    setEsperaLogin(false);

    if(resp.conectado){
      // llenamos de datos el data_user.
      const user_data: User = resp;
      props.userData(user_data);

      //le damos un token 
      // const token = jwt.sign(resp, 'secretpass', {expiresIn:"3m"});

      //cerramos el div de profile
      props.close_profile();
    }    
  };





  // registro de usuario, peticion a la base de datos.
  const handleSignin = async (e:any) => {
    e.preventDefault();
    setErrorSignin(null);
    setErroresCliente([]);
    const data = {
      //si el usuario o la contraseña esta vacio, que devuelva "".
      username: User_signin? User_signin.current? User_signin.current.value? User_signin.current.value: "": "": "",
      pass: Pass_signin? Pass_signin.current? Pass_signin.current.value? Pass_signin.current.value: "": "": "",
      email: Email_signin? Email_signin.current? Email_signin.current.value? Email_signin.current.value: "": "": ""
    };

    if(!(erroresSigninCliente(data.username, errorinputemail,errorinputpass,errorinputrepeatedpass).length>0)){
      setEsperaSignin(true);
      const resp = await Signin_bd(URL_SIGNIN, data);

      // llenamos de datos el data_user
      const user_data: User = resp;
      props.userData(user_data);

      //recogemos los errores de la base de datos.
      setErrorSignin(resp.error);
      setEsperaSignin(false); 

      //cerramos el div de profile
      props.close_profile();
    }else{
      //recogemos los errores del signin
      setErroresCliente(erroresSigninCliente(data.username, errorinputemail,errorinputpass,errorinputrepeatedpass));
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
                disabled={esperaLogin}
                className={
                  esperaLogin ? "btn-continuar button-canceled" : "btn-continuar"
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

         {/* registro de usuario */}
        <form className="Sign brd-lft">
          <FaUserEdit className="image-nav-sign" />
          <p>¿No tienes cuenta? Subscribirse:</p>
          
          <input
            type="text"
            className="div-input"
            placeholder="Usuario *"
            ref={User_signin}
          ></input>
          
          <div className="div-div-input">
          <input
            type="text"
            className={"div-input " + errorinputemail}
            placeholder="email *"
            ref={Email_signin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const valido: string = emailValidation(event);
              seterrorinputemail(valido);
            }}
          ></input>
          
          </div>
          <div className="div-div-input">
          <input 
            type="password"
            className={"div-input " + errorinputpass}
            placeholder="Contraseña *"
            ref={Pass_signin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const valido: string = passValidation(event);
              seterrorinputpass(valido);
              setPassSignin(event.target.value);
              const repeatedpass: string= Repeatedpass_signin? Repeatedpass_signin.current? Repeatedpass_signin.current.value? Repeatedpass_signin.current.value: "": "": "";
              const verify_rep_pass=equal(repeatedpass,event.target.value);
              seterrorinputrepeatedpass(verify_rep_pass);
            }}
          ></input>
          </div>
          <div className="div-div-input">
          <input 
            type="password"
            className={"div-input " + errorinputrepeatedpass}
            placeholder="Repetir Contraseña *"
            ref={Repeatedpass_signin}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
              const valido: string = repeatedpassValidation(event,passSignin);
              seterrorinputrepeatedpass(valido);
            }}
          ></input>
          </div>
          <button 
            onClick={handleSignin}
            disabled={esperaSignin}
            className={
              esperaSignin ? "btn-continuar button-canceled" : "btn-continuar"
            }>
            Crear Cuenta
          </button>
          {erroresCliente.map((element)=>(
            <div className="alert alert-danger" key={element.length}>
              {element}
          </div>
          ))}
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
