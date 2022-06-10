/* eslint-disable array-callback-return */
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { get } from "../Utils/Api_get";
import "./CSS/FilmData.css";
import { Comment, Comments, filmData, Review, User } from "../Utils/interfaces";
import images from "../Images/images";
import { foto_puntaje } from "../Utils/Puntaje";
import { AiFillStar } from "react-icons/ai";
import { Comments_bd, deleteComment_bd, getReview, newComments_bd, updateComment_bd } from "../Utils/BD_request";
import { FaPencilAlt, FaSadCry, FaSadTear } from "react-icons/fa";
import { IoMdAddCircle} from "react-icons/io";
import { ImCross} from "react-icons/im";
import { CommentCard } from "../Components/CommentCard";
import { ReviewCard } from "../Components/ReviewCard";
import Swal from "sweetalert2";

interface FilmId {
  peliculaId: string;
}

export function FilmData(props: { user: User }) {
  const filmId: FilmId = useParams();
  const [film, setFilm] = useState<filmData>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [review, setReview] = useState<Review>();

  // datos importantes para comentario
  const [rangeVotes, setRangeVotes] = useState<number[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>();
  const [UserVote, setUserVote] = useState<string>(); 
  const [statRectangleWidth,setStatRectangleWidth ] = useState<object[]>([]);

  // nuevo comentario
  const UserAverage = useRef<HTMLInputElement>(null);  
  const newUserCOmment = useRef<HTMLTextAreaElement>(null);  
  const [newCommentFail, setNewCommentFail] = useState<string>("");
  const [userCommentExists,setUserCommentExists] = useState(false);


  // urls de backend
  const URL_GETREVIEW = "http://localhost/bd-back/getReview.php";
  const URL_GETCOMMMENTS = "http://localhost/bd-back/getComments.php";
  const URL_UPDATECOMMMENT = "http://localhost/bd-back/updateComment.php";
  const URL_DELETECOMMMENT = "http://localhost/bd-back/deleteComment.php";
  const URL_NEWCOMMMENT = "http://localhost/bd-back/newComment.php";


  
  // funcion para rellenar las stats de usuario
  function gettingStats(RangeVotes:Array<number>, NumComm:number ,VotesSum:number){
    const bestScore = NumComm * 5;
    const Score = (VotesSum*5)/bestScore;
    setUserVote(Score.toFixed(2));
    RangeVotes.map((RangeVote)=>{
      const style: object = {width: ((RangeVote/NumComm)*100)+'%'};
      setStatRectangleWidth((prevStat)=>(prevStat.concat(style)));
    });
  }

  const DeleteForSure = (userId:string)=>{
    Swal.fire({
      title: 'Estas seguro?',
      text: "Una vez aceptado, no hay marcha atrás",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        const data= {userId: +userId}
        const resp = await deleteComment_bd(URL_DELETECOMMMENT, data);
        Swal.fire(
          resp.mensaje
        )
        setCommentUpdate(!!!commentUpdate);
      }
    })
  }
  const UpdateForSure = (comment: string, vote: number)=>{
    Swal.fire({
      title: 'Estas seguro?',
      text: "Una vez aceptado, se modificará tu comentario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, modificar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data= {userId: props.user.UserId,comment:comment, vote: vote }
        const resp = await updateComment_bd(URL_UPDATECOMMMENT, data);
        console.log(resp);
        Swal.fire(
          resp.mensaje
        )
        setCommentUpdate(!!!commentUpdate);
      }
    })
  }
  const Success = ()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comentario creado exitosamente.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  // recopilador de comentarios
  const Commentsget =  () =>{
    setUserCommentExists(false);
    var movieId: number = +filmId.peliculaId;
    const data = {filmId:  movieId};
    Comments_bd(URL_GETCOMMMENTS, data).then((commentss:Comments) =>{
      if(props.user.conectado){
        commentss.Comments.map((com)=>{
          if(com.Username===props.user.UserName){
            setUserCommentExists(true);
          }
        });
      }
      setComments(commentss.Comments);
      setTotalVotes(commentss.NumComments);
      gettingStats(commentss.Votes,commentss.NumComments, commentss.VotesSummary);
      setRangeVotes(commentss.Votes);
    })
  }

  //recopilador de review
  const getreview = async () => {
    const data = { filmId: +filmId.peliculaId };
    const resp = await getReview(URL_GETREVIEW, data);
    setReview(resp.Review);
  };

  // actualizador de comentarios
  const [commentUpdate, setCommentUpdate] = useState(false);

  
  useEffect(() => {
    get("https://api.themoviedb.org/3/movie/" + filmId.peliculaId+"?language=es-ES").then(
      (data) => {
        setFilm(data);
      }
    );
    Commentsget();
    getreview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmId,commentUpdate, props.user]);



  //nuevo comentario o actualización del mismo
  const newCommentOfUser =async (e:any) => {
    e.preventDefault();
    const averageUser: null|number = UserAverage? UserAverage.current? UserAverage.current.value? +UserAverage.current.value: null: null: null;
    const UserCOmmentnew: string = newUserCOmment? newUserCOmment.current? newUserCOmment.current.value? newUserCOmment.current.value: "": "": "";
    if(props.user.conectado){
      if(averageUser === null || UserCOmmentnew === ""){
        setNewCommentFail("Faltan datos por añadir");
      }else if(averageUser<0 || averageUser>5){
        setNewCommentFail("La nota debe ser entre 0 y 5");
      }else{
        if(userCommentExists){
          UpdateForSure(UserCOmmentnew, averageUser);
        }else{
          const data = {userId: props.user.UserId,comment: UserCOmmentnew, filmId: +filmId.peliculaId, vote: averageUser, username: props.user.UserName, admin: props.user.Admin};
          await newComments_bd(URL_NEWCOMMMENT, data);
          Success();
          setCommentUpdate(!!!commentUpdate);
        } 
      }
    }else{
      setNewCommentFail("Para comentar hay que estar registrado");
    }
  }
  const imageUrl = film
    ? film.poster_path
      ? "https://image.tmdb.org/t/p/w400" + film.poster_path
      : images.placeholder
    : "";

  return (
    <>
      <p className="title">
        <strong> {film ? film.title : "No data"}</strong>
      </p>
      <div className="filmdetail_box">
        <img
          src={imageUrl}
          className="filmImage"
          alt={film ? film.title : "Sin foto"}
        ></img>
        <div className="filmData">
          <p>
            <strong>Lanzamiento: </strong>{" "}
            {film ? film.release_date : "sin fecha de lanzamiento"}
          </p>

          {film ? (
            <p>
              <strong>Géneros: </strong>
              {film.genres.map((genre) => genre.name).join(", ")}
            </p>
          ) : (
            "Género/s desconocidos"
          )}
          <p>
            <strong>Descripción: </strong>
            {film ? film.overview : "No hay descripción."}
          </p>
          <div className="puntuacion">
            <strong>
              Puntuación en TMDB:{" "}
              {film ? film.vote_average : "Puntuación no disponible"}
            </strong>
            {film ? (
              <img
                src={foto_puntaje(film.vote_average)}
                className="image_votes"
                alt={film.original_title}
              ></img>
            ) : (
              "Puntaje desconocido"
            )}
            {newCommentFail!=="" && 
              <div className="alert alert-danger">
                {newCommentFail}
                <button className="close-error" onClick={()=>setNewCommentFail("")}><ImCross/></button>
              </div>
            }
            
              <form className='newComment-form'>
                <label ><strong>Tu puntuación: </strong>
                  <input type="number" ref={UserAverage} className="contact-form-average"/>
                </label>
                <textarea ref={newUserCOmment} className='contact-form-item contact-form-email-message'>
                </textarea>
                <button type="submit" onClick={newCommentOfUser} className="contact-form-item NewComment"> Añadir comentario {userCommentExists? <FaPencilAlt/> :<IoMdAddCircle/>} </button>
              </form>

          </div>
        </div>
      </div>





      {/* parte reseña del administrador */}
      <p className="title">Reseña del administrador: </p>
      {review !==undefined ? <>
        <div className="filmdetail_box-review">
          <ReviewCard review={review}/>
        </div>
      </> 
      : <>
          <div className="filmdetail_box">
            <FaSadTear className="emote-visible"/><h3> Todavía no se ha hecho reseña de esta película</h3> <FaSadCry className="emote-visible"/>
          </div>
        </>}





      {/* parte de los comentarios */}
      <p className="title">Comentarios: </p>
      {comments.length>0 ? <>
      <div className="filmdetail_box comments">
        <div className="count">
          <h1><strong> {UserVote}/5 </strong> </h1>
          <h3>{totalVotes} opiniones: </h3>
          <div className="stats"> 5 <AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[5]}></div></div>{rangeVotes[5]} votos</div>
          <div className="stats"> 4 <AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[4]}></div></div>{rangeVotes[4]} votos</div>
          <div className="stats"> 3<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[3]}></div></div>{rangeVotes[3]} votos</div>
          <div className="stats"> 2<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[2]}></div></div>{rangeVotes[2]} votos</div>
          <div className="stats"> 1<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[1]}></div></div>{rangeVotes[1]} votos</div>
          <div className="stats"> 0<AiFillStar className="cl-yllw"/> <div className="rectangle"> <div className="relative-rectangle" style={statRectangleWidth[0]}></div></div>{rangeVotes[0]} votos</div>
        </div>
        {comments.map((Comentary)=>(

         <CommentCard key={Comentary.UserId} comment={Comentary} user={props.user}  DeleteForSure={DeleteForSure}  UpdateForSure={UpdateForSure}
         allowDelete={props.user.Admin===1 ?true:props.user.UserId===Comentary.UserId ?true:false} 
          />
        ))} 
      </div>
      </>
      : <>
          <div className="filmdetail_box">
            <FaSadTear className="emote-visible"/><h3> Todavía no hay comentarios de esta película</h3> <FaSadCry className="emote-visible"/>
          </div></>}
    </>  
  );
}
