import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GiPlagueDoctorProfile} from "react-icons/gi";
import {FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import MenuResponsive from "./MenuResponsive";
import "./CSS/Navegador.css";
import SearchArea from "./Search_area";
import { Sign } from "./Sign";
import { User } from "../Utils/interfaces";
import { UserOptions } from "./UserOptions";
import images from "../Images/images";

export function Navegador(props: {
  userData: Function;
  user: User;
}) {
  const [toggle_press, settoggle_press] = useState<boolean>(false);
  const [profile_press, setprofile_press] = useState<boolean>(false);
  
  function showitems(){
    if (profile_press && !toggle_press) {
        setprofile_press(!!!profile_press);
      }
      settoggle_press(!!!toggle_press );
  }
  function showprofile(){
    if (!profile_press && toggle_press) {
        settoggle_press(!!!toggle_press);
      }
      setprofile_press(!!!profile_press);
  }

  
  return (
    <div className="navegador">
      <div className="cabecera">
        {/* toggle desplegable */}
        <div className="toggle ">
          <button className=" toggle-button" onClick={showitems}>
            <FaBars />
          </button>
        </div>

        {/* logo */}
        <div className="logo">
          <Link to="/">
            <img className="image-logo" src={images.logo} alt="logo"/>
          </Link>
        </div>

        {/* links */}
        <MenuItems />

        {/* formulario de busqueda */}
        <SearchArea display="" />

        {/* boton de perfil */}
        <div className="profile-div">
            <button className=" image-nav" type="submit" onClick={showprofile}>
            {props.user.conectado? <GiPlagueDoctorProfile />:<FaUsers />}
          </button>
        </div>
      </div>

      {/* profile box */}
      {profile_press ? 
        props.user.conectado
          ? <UserOptions userData ={props.userData}user={props.user} close_profile={showprofile}/>
          : <Sign userData ={props.userData} close_profile={showprofile}/>
        : null}

      {/* toggle desplesgable */}
      {toggle_press ? <MenuResponsive /> : null}
    </div>
  );
}
