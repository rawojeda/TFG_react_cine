import React from "react";
import "./CSS/Search_area.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ISearch_areaProps {
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
  public OnSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  public render() {
    return (
      <div className={"formulario-busqueda" + this.props.display}>
        <input
          type="text"
          className="Buscador"
          placeholder="Seven, Martin Escorsese..."
          value={this.state.searchText}
          onChange={this.OnSearchTextChange}
        />
        <Link
          to={"/searcher/" + this.state.searchText}
          className="search-button"
        >
          <FaSearch />
        </Link>
      </div>
    );
  }
}

export default SearchArea;
