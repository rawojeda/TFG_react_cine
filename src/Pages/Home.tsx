import React from "react";
import "./CSS/Home.css";
import { Profile } from "./Profile";



class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        {/* <p>
          nuevas PELIS:{" "}
          <button
            onClick={this.changebuttoncolour}
            className={"changed_button " + this.state.color_button}
          >
            {this.state.color_button}
          </button>
        </p> */}
        <Profile></Profile>
      </div>
    );
  }
}
export default Home;
