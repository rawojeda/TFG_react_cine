import React from "react";

interface ISectionProps {
  name: string;
}
interface ISectionState {
  
}
class Section extends React.Component<ISectionProps, ISectionState> {
  constructor(props: ISectionProps) {
    super(props);
  }
 
  public render() {
    return (
      <li className="section">
          {this.props.name}
      </li>
    );
  }
}
export default Section;
