import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HomeStructure from "./Pages/HomeStructure";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain ? domain : ""}
      clientId={clientId ? clientId : ""}
      redirectUri={window.location.origin} //con esto, una vez logeado me devuelve a la página donde estaba.
    >
      <HomeStructure />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
