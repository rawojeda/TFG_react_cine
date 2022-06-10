import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Comment, User } from "../Utils/interfaces";
import './CSS/CommentCard.css';
export function CommentCard(props: { allowDelete:boolean;comment: Comment ; user: User; DeleteForSure: Function;UpdateForSure: Function;}) {

    return (
        <div className="CommentaryCard">
            <div className="CommentUserData">
                <div className="Userdata"><FaUserCircle /> {props.comment.Username}</div>
                <div className="Userdata"> <AiFillStar className="cl-yllw"/> {props.comment.Vote}/5 <AiFillStar className="cl-yllw"/></div>
                <div className="Userdata">{props.comment.Date.substring(0,10)}</div>
            </div>
            <p className="CommentText">{props.comment.Comment}</p>
            {props.allowDelete? <button className="delete-button" onClick={()=>props.DeleteForSure(props.comment.UserId)}> <AiFillDelete/> </button> : null}
        </div>
    );
}