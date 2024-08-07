import React, { useRef, useState } from "react";
import "./CSS/Sign.css";
import { FaUserCheck, FaUserEdit } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { emailValidation, equal, erroresSigninCliente, passValidation, repeatedpassValidation } from "../Utils/ErrorHanding";
import { Login_bd, Signin_bd } from "../Utils/BD_request";
import { User } from "../Utils/interfaces";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const URL_LOGIN = "http://localhost/bd-back/login.php";
const URL_SIGNIN = "http://localhost/bd-back/signin.php";



export function Sign(props: { userData: Function; close_profile: Function}) {
  //errores servidor
  const User_login = useRef<HTMLInputElement>(null);
  const Pass_login = useRef<HTMLInputElement>(null);
  const User_signin = useRef<HTMLInputElement>(null);
  const Pass_signin = useRef<HTMLInputElement>(null);
  const Repeatedpass_signin = useRef<HTMLInputElement>(null);
  const Email_signin = useRef<HTMLInputElement>(null);
  const [errorSignin, setErrorSignin] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const [esperaLogin, setEsperaLogin] = useState(false);
  const [esperaSignin, setEsperaSignin] = useState(false);


  //errores durante el escrito del Signin
  const [passSignin, setPassSignin] = useState("");  
  const [errorinputemail, seterrorinputemail] = useState("");
  const [errorinputpass, seterrorinputpass] = useState("");
  const [errorinputrepeatedpass, seterrorinputrepeatedpass] = useState("");
  const [howToPassw,setHowToPassw ] = useState(false);



  //Guía de como poner contraseña
  const howTo = (e:any) =>{
    e.preventDefault();
    setHowToPassw(!!!howToPassw);
  } 

  //errores cliente
  const [erroresCliente,setErroresCliente] = useState<string>("");

  // Inicio de sesion de usuario, peticion a la base de datos.
  const handleLogin = async () => {
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

      const cookies = new Cookies();
      cookies.set("User", user_data.UserName, {path: '/', expires: (new Date(Date.now()+60 * 60 * 24*365))});
      
      successAction("Conectado correctamente");
      //cerramos el div de profile
      props.close_profile();
    }    
  };



  const successAction = (title: string)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  // registro de usuario, peticion a la base de datos.
  const handleSignin = async (e:any) => {
    e.preventDefault();
    setErrorSignin("");
    setErroresCliente("");
    const data = {
      //si el usuario o la contraseña esta vacio, que devuelva "".
      username: User_signin? User_signin.current? User_signin.current.value? User_signin.current.value: "": "": "",
      pass: Pass_signin? Pass_signin.current? Pass_signin.current.value? Pass_signin.current.value: "": "": "",
      email: Email_signin? Email_signin.current? Email_signin.current.value? Email_signin.current.value: "": "": ""
    };
    if(erroresSigninCliente(data.username, errorinputemail,errorinputpass,errorinputrepeatedpass)==""){
      setEsperaSignin(true);
      const resp = await Signin_bd(URL_SIGNIN, data);

      // llenamos de datos el data_user
      const user_data: User = resp;
      props.userData(user_data);

      //recogemos los errores de la base de datos.
      setErrorSignin(resp.error);
      setEsperaSignin(false); 

      if(resp.conectado){
        successAction("Usuario creado, conectado correctamente");
        const cookies = new Cookies();
        cookies.set("User", user_data.UserName, {path: '/'});
        //cerramos el div de profile
        props.close_profile();
      }

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
          
              {errorLogin!=="" && 
              <div className="alert alert-danger">
                {errorLogin}
                <button className="close-error" onClick={()=>setErrorLogin("")}><ImCross/></button>
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
          {howToPassw ?<><div className="HowtoText"> La contraseña debe estar entre 8 y 16 y contener al menos una letra mayúscula, una letra minúscula y un número </div>
          <div className="pico-bocadillo-abajo"></div></>:null}
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
          {erroresCliente!=="" && 
              <div className="alert alert-danger ds-err-flex">
                <p>{erroresCliente}</p>
                <button className="close-errors-signin" onClick={()=>setErroresCliente("")}><ImCross/></button>
              </div>
              }
          {errorSignin!=="" && 
              <div className="alert alert-danger">
                {errorSignin}
                <button className="close-error" onClick={()=>setErrorSignin("")}><ImCross/></button>
              </div>
              }
        </form>
      </div>
      <div className="pico-bocadillo"></div>
      <button onClick={e=>howTo(e)} className="alert-password">< FiAlertTriangle /></button>
    </>
  );
}
