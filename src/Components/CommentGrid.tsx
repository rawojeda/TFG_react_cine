import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Comment, User } from "../Utils/interfaces";
import { CommentCard } from "./CommentCard";
import './CSS/CommentGrid.css';
export function CommentGrid(props: {  comments: Comment[] ; VotesSummary:number; user: User; rangeVotes:number[], totalVotes: number}) {
        const [UserVote, setUserVote] = useState<string>(); 
        const [statRectangleWidth,setStatRectangleWidth ] = useState<object[]>([]);
        function gettingStats(RangeVotes:Array<number>, NumComm:number ,VotesSum:number){
            const bestScore = NumComm * 5;
            const Score = (VotesSum*5)/bestScore;
            setUserVote(Score.toFixed(2));
            RangeVotes.map((RangeVote)=>{
              const style: object = {width: ((RangeVote/NumComm)*100)+'%'};
              setStatRectangleWidth((prevStat)=>(prevStat.concat(style)));
            });
        }
        gettingStats(props.rangeVotes,props.totalVotes, props.VotesSummary);
    return (<>
        <p className="title">Comentarios: </p>
      
      <div className="filmdetail_box comments">
        <div className="count">
          <h1><strong> {UserVote}/5 </strong> </h1>
          <h3>{props.totalVotes} opiniones: </h3>
          <div className="stats"> 5 <AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[5]}></div></div>{props.rangeVotes[5]} votos</div>
          <div className="stats"> 4 <AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[4]}></div></div>{props.rangeVotes[4]} votos</div>
          <div className="stats"> 3<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[3]}></div></div>{props.rangeVotes[3]} votos</div>
          <div className="stats"> 2<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[2]}></div></div>{props.rangeVotes[2]} votos</div>
          <div className="stats"> 1<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[1]}></div></div>{props.rangeVotes[1]} votos</div>
          <div className="stats"> 0<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[0]}></div></div>{props.rangeVotes[0]} votos</div>
        </div>
        {props.comments.map((Comentary)=>(
         <CommentCard key={Comentary.UserId} comment={Comentary}/>
        ))} 
      </div>
      
     
          </>
    );
}