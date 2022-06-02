import React from "react";

interface ISectionProps {
  name: string;
}
interface ISectionState {
  
}
class Section extends React.Component<ISectionProps, ISectionState> { 
  public render() {
    return (
      <li className="section">
          {this.props.name}
      </li>
    );
  }
}
export default Section;
