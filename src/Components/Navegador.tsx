import { Link } from "react-router-dom";
import React from "react";
import MenuItems from "./MenuItems";
import "./CSS/Navegador.css";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdOutlineMovie } from "react-icons/md";
import { FaBars, FaSearch } from "react-icons/fa";
import MenuResponsive from "./MenuResponsive";

interface IHomeState {
  toggle_press: boolean;
  searchText: string;
}


class Navegador extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = { toggle_press: false, searchText: ""};
  }

  public showitems = () => {
    this.setState({toggle_press: !!!this.state.toggle_press})
    console.log(this.state.toggle_press);
  };
  public onSearchTextChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({searchText: event.target.value});
    console.log(this.state.searchText);
  }
  public render() {
    return (
      <div className="navegador">
      <div className="cabecera">
          {/* toggle desplegable */}
            <div className="toggle ">
              <button className=" toggle-button" onClick={this.showitems}>
                <FaBars/>
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
            <div className="formulario-busqueda">
              <input
                type="text"
                className="Buscador"
                placeholder="Seven, Martin Escorsese..."
                value={this.state.searchText}
                onChange={this.onSearchTextChange}
              />
              <button className="search-button" type="submit">
                <FaSearch />
              </button>
            </div>

            {/* boton de perfil */}
            <div className="profile-div">
              <button className=" image-nav" type="submit">
                <GiPlagueDoctorProfile />
              </button>
            </div>
        </div>
        {/* toggle desplesgable */}
        {this.state.toggle_press ? <MenuResponsive/> : null}
        </div>
    );
  }
}
export default Navegador;
