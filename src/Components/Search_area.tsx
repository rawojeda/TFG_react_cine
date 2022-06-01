import React from "react";
import "./CSS/Search_area.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ISearch_areaProps {
  OnSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  display: string;
}

interface ISearch_areaState {
  searchText: string;
}

class SearchArea extends React.Component<ISearch_areaProps, ISearch_areaState> {
  constructor(props: ISearch_areaProps) {
    super(props);
    this.state = { searchText: "" };
  }
  public OnSearchTextChangeInternal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ searchText: event.target.value });
  };

  public buscar = () => {};
  public render() {
    return (
      <div className={"formulario-busqueda" + this.props.display}>
        <input
          type="text"
          className="Buscador"
          placeholder="Seven, Martin Escorsese..."
          value={this.state.searchText}
          // lo suyo seria que aqui cambie el this.state.searchtext pero no lo envie a home_structure 
          onChange={this.OnSearchTextChangeInternal}
        />
        <Link
          to={"/searcher/" + this.state.searchText}
          className="search-button"
          type="submit"
          // lo suyo seria que en el onclick se fuese a this.OnSearchTextChangeInternal
          onClick={this.buscar}
        >
          <FaSearch />
        </Link>
      </div>
    );
  }
}

export default SearchArea;
