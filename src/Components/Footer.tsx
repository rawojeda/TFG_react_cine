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
        <div>
          <FaTwitter className="image-nav fs" />
          <FaLinkedinIn className="image-nav sp-bt fs" />
          <FaFacebook className="image-nav fs"/>
        </div>
      </div>
    );
  }
}
export default Footer;
