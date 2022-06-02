import React from "react";
import "./CSS/Footer.css";
import { FaTwitter, FaLinkedinIn, FaFacebook } from "react-icons/fa";
class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="pie_pagina">
        <div >
            Powered by React
        </div>
        <div className="social-icon">
          <FaTwitter />
          <FaLinkedinIn className="sp-bt" />
          <FaFacebook />
        </div>
      </div>
    );
  }
}
export default Footer;
