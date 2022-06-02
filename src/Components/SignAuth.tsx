import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./CSS/Sign_Auth.css";

function SignAuth() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <div className="Sign-area">
        {isAuthenticated ? (
          <button className="Log-in-out" onClick={() => logout()}>
            <p>Cerrar Sesión: </p>
          </button>
        ) : (
          <button className="Log-in-out" onClick={() => loginWithRedirect()}>
            <p> Inicia Sesión/registrarse: </p>
          </button>
        )}
      </div>
      <div className="pico-bocadillo"></div>
    </>
  );
}
export default SignAuth;
