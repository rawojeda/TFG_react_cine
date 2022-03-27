import React, { Fragment, useState, useEffect } from "react";
import { MoviesGrid } from "../Components/MoviesGrid";
import { get } from "../Utils/Api_get";
import "./CSS/Home.css";

interface IHomeProps{
  collapsed:boolean;
}
interface IHomeState{
  collapsed:boolean;
}

class Home extends React.Component<IHomeProps,IHomeState>{
  constructor(props: IHomeProps){
    super(props);
    // change state
  }
  public render (){
    return (<p>nuevas PELIS: {this.props.collapsed ? "collapse" : "shown"}</p>)
  }
}
export default Home;
// export function Home(): JSX.Element {
//   const [films, setfilms]= useState([]);
//   const searchURL = "https://api.themoviedb.org/3/discover/movie?page=1";
//   useEffect(() => {
//     get(searchURL).then((data) => {
//       setfilms(data.results);
//     });
//   }, []);

//   return (
//     <Fragment>
//       <div className="new-films">
//         <MoviesGrid films={films} />
//       </div>
//       <div className="last-hour"></div>
//     </Fragment>
//   );
// }
