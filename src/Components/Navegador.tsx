import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdOutlineMovie } from "react-icons/md";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import MenuResponsive from "./MenuResponsive";
import "./CSS/Navegador.css";
import SearchArea from "./Search_area";
import SignAuth from "./SignAuth";
import { useAuth0 } from "@auth0/auth0-react";

export function Navegador() {
  const [toggle_press, settoggle_press] = useState<boolean>(false);
  const [profile_press, setprofile_press] = useState<boolean>(false);
  const {user, isAuthenticated} = useAuth0();
  
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
            <MdOutlineMovie />
          </Link>
        </div>

        {/* links */}
        <MenuItems />

        {/* formulario de busqueda */}
        <SearchArea display="" />

        {/* boton de perfil */}
        <div className="profile-div">
          {isAuthenticated
            ? <button className="profile-button" onClick={showprofile}>
              <img className="profile-button-image" src={user?.picture} alt={user?.name}></img>
            </button>
            :<button className=" image-nav" type="submit" onClick={showprofile}>
            <GiPlagueDoctorProfile />
          </button>
          }
          
        </div>
      </div>

      {/* profile box */}
      {/* {this.state.profile_press ? <Sign /> : null} */}
      {profile_press ? <SignAuth /> : null}

      {/* toggle desplesgable */}
      {toggle_press ? <MenuResponsive /> : null}
    </div>
  );
}
