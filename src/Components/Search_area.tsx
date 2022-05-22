import React from "react";
import "./CSS/Search_area.css";
import {FaSearch } from "react-icons/fa";

interface ISearch_areaProps{
  OnSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  display: string;
}

interface ISearch_areaState {
  searchText: string;
}


class Search_area extends React.Component<ISearch_areaProps, ISearch_areaState> {
  constructor(props: ISearch_areaProps) {
    super(props);
    this.state = { searchText:""};
  }
  public OnSearchTextChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
    this.props.OnSearchTextChange(event);
  }
  public buscar = () => {
    console.log(this.state.searchText);
  }
  public render() {
    return (
            <div className={"formulario-busqueda"+this.props.display}>
              <input
                type="text"
                className="Buscador"
                placeholder="Seven, Martin Escorsese..."
                value={this.state.searchText}
                onChange={this.OnSearchTextChangeInternal}
              />
              <button className="search-button" type="submit" onClick={this.buscar}>
                <FaSearch />
              </button>
            </div>
    );
  }
}
export default Search_area;
