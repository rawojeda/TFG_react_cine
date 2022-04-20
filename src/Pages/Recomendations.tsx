import React from "react";
import Section from "../Components/Section";
import "./CSS/Recomendations.css";

interface IRecomendationState {
  sections: Array<string>;
}
class Recomendations extends React.Component<{}, IRecomendationState> {
  constructor(props: {}) {
    super(props);
    this.state = {sections: ["Animacion", "Aventura", "Accion", "Ciencia ficcion", "Comedia", "Drama", "Terror" ]};
  }
  
  public render() {
    return (
      <>
        <p className="title"> Recomendaciones Por Género: </p>
        <ul className="Sections">
            {this.state.sections.map((section) => (
                <Section name={section}/>
            ))}
        </ul>
      </>
    );
  }
}
export default Recomendations;
