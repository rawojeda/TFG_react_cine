import React from "react";
import "./CSS/Home.css";

interface IHomeProps {
  collapsed: boolean;
}
interface IHomeState {
  change: boolean;
  color_button: string;
}
class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = { change: false, color_button: "red" };
  }
  public changebuttoncolour = () => {
    this.setState({ change: !!!this.state.change });
    if (this.state.change)
     this.setState({ color_button: "red" });
    else
     this.setState({ color_button: "green" });
  };
  public render() {
    return (
      <div>
        <p>
          nuevas PELIS:{" "}
          <button
            onClick={this.changebuttoncolour}
            className={"changed_button " + this.state.color_button}
          >
            {this.state.color_button}
          </button>
        </p>
      </div>
    );
  }
}
export default Home;
