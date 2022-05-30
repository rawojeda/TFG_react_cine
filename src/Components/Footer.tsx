import React from "react";
import "./CSS/Footer.css";
import { FaTwitterSquare, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="pie_pagina">
        <div >
            Powered by React
        </div>
        <div>
          <FaTwitterSquare className="image-nav" />
          <FaLinkedin className="image-nav sp-bt" />
          <FaFacebookSquare className="image-nav" />
        </div>
      </div>
    );
  }
}
export default Footer;
