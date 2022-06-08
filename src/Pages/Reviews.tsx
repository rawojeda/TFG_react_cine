import { useEffect, useState } from "react";
import { ReviewCard } from "../Components/ReviewCard";
import { Reviewsget } from "../Utils/BD_request";
import { Review, Reviews } from "../Utils/interfaces";
import './CSS/Reviews.css';

export function Reviewss() {
    const URL_GETREVIEWS = "http://localhost/bd-back/getReviews.php";
    const [reviews,setReviews] =useState<Review[]>([]);

    const getreviews = async () => {
        const resp: Reviews= await Reviewsget(URL_GETREVIEWS);
        setReviews(resp.Reviews);
      
    }
    useEffect(() => {
        getreviews();
    }, [])
        
  return (
    <div className="Reviews">
      <p className="title">
        <strong> Reseñas: </strong>
      </p>
      <div className="reviews-box">
        {reviews.map((review)=>(
          <div key={review.FilmId}><ReviewCard review={review}/></div>
        ))}
      </div>
    </div>
  );
}
