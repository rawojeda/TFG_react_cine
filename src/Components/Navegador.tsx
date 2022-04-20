import { Link } from "react-router-dom";
import React from "react";
import MenuItems from "./MenuItems";
import "./CSS/Navegador.css";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { MdOutlineMovie } from "react-icons/md";
import { FaBars, FaSearch } from "react-icons/fa";
import MenuResponsive from "./MenuResponsive";
import Sign from "./Sign";

interface INavegatorProps{
  OnSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface INavegatorState {
  toggle_press: boolean;
  searchText: string;
  profile_press: boolean;
}


class Navegador extends React.Component<INavegatorProps, INavegatorState> {
  constructor(props: INavegatorProps) {
    super(props);
    this.state = { toggle_press: false, searchText:"", profile_press: false};
  }

  public showitems = () => {
    if(this.state.profile_press && !this.state.toggle_press){
      this.setState({profile_press: !!!this.state.profile_press})
    }
    this.setState({toggle_press: !!!this.state.toggle_press})
  };
  public OnSearchTextChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.OnSearchTextChange(event);
    this.setState({searchText: event.target.value});
  }
  public showprofile = () => {
    if(!this.state.profile_press && this.state.toggle_press){
      this.setState({toggle_press: !!!this.state.toggle_press})
    }
    this.setState({profile_press: !!!this.state.profile_press})
  };
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
                onChange={this.OnSearchTextChangeInternal}
              />
              <button className="search-button" type="submit">
                <FaSearch />
              </button>
            </div>

            {/* boton de perfil */}
            <div className="profile-div">
              <button className=" image-nav" type="submit" onClick={this.showprofile}>
                <GiPlagueDoctorProfile />
              </button>
            </div>
        </div>
        {/* profile box */}
        {this.state.profile_press ? <Sign/> : null}
        {/* toggle desplesgable */}
        {this.state.toggle_press ? <MenuResponsive OnSearchTextChange={this.props.OnSearchTextChange}/> : null}
        </div>
    );
  }
}
export default Navegador;
