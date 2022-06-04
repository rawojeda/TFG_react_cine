import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GiPlagueDoctorProfile, GiSparkSpirit } from "react-icons/gi";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import MenuResponsive from "./MenuResponsive";
import "./CSS/Navegador.css";
import SearchArea from "./Search_area";
import { Sign } from "./Sign";

export function Navegador(props: {
  acceder: Function;
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
          <Link className="image-nav" to="/">
            <GiSparkSpirit />
          </Link>
        </div>

        {/* links */}
        <MenuItems />

        {/* formulario de busqueda */}
        <SearchArea display="" />

        {/* boton de perfil */}
        <div className="profile-div">
          {/* {isAuthenticated
            ? <button className="profile-button" onClick={showprofile}>
              <img className="profile-button-image" src={user?.picture} alt={user?.name}></img>
            </button>: */}
            <button className=" image-nav" type="submit" onClick={showprofile}>
            <GiPlagueDoctorProfile />
          </button>
          {/* } */}
          
        </div>
      </div>

      {/* profile box */}
      {profile_press ? <Sign acceder ={props.acceder}/> : null}
      {/* {profile_press ? <SignAuth /> : null} */}

      {/* toggle desplesgable */}
      {toggle_press ? <MenuResponsive /> : null}
    </div>
  );
}
