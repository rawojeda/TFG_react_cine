import "./CSS/Spinner.css";
import { FaSpinner } from 'react-icons/fa';

export function Spinner(){
    return(<div className="loading">
        <FaSpinner className="spinning" size={60}/>
    </div>);
}