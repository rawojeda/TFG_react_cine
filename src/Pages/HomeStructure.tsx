import "./CSS/HomeStructure.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Navegador from "../Components/Navegador";

class HomeStructureX extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <Navegador />
        <div className="contenido">
          <Switch>
            <Route exact path="/">
              <Home color_button="red" />
            </Route>
            <Route path="/">404</Route>
          </Switch>
        </div>
        <div className="pie_pagina">PIE DE PÁGINA</div>
      </Router>
    );
  }
}
export default HomeStructureX;
