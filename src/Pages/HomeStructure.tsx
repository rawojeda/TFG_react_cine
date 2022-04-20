import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Navegador from "../Components/Navegador";
import Recomendations from "./Recomendations";

interface IHomeStructureState {
  searchText: string;
}

class HomeStructure extends React.Component<{}, IHomeStructureState> {
  
  constructor(props: {}) {
    super(props);
    this.state = { searchText: ""};
  }

  public onSearchTextChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({searchText: event.target.value});
    console.log(this.state.searchText);
  }

  public render() {
    return (
      <Router>
        <Navegador OnSearchTextChange={this.onSearchTextChange}/>
        <div className="contenido">
          <Switch>
          <Route exact path="/">
              <Home color_button="red" />
            </Route>
            <Route exact path="/Estrenos">
              Estrenos
            </Route>
            <Route exact path="/Reviews">
              Reviews
            </Route>
            <Route exact path="/Recomendaciones">
              <Recomendations/>
            </Route>
            
            <Route path="/">404</Route>
          </Switch>
        </div>
        <div className="pie_pagina">PIE DE PÁGINA</div>
      </Router>
    );
  }
}
export default HomeStructure;
