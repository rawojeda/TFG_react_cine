// PELICULAS
export interface dataType {
    page: number;
    results: Array<FilmDescription>;
    total_pages: number;
    total_results: number;
  }
  export interface FilmDescription {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_data: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }




  // DETALLES DE UNA PELÍCULA EN CONCRETO
  export interface belongs_to{
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  export interface genre{
    id: number;
    name: string;
  }
  export interface prodcomp{
    id: number;
    logo_path: string;
    name: string;
    origin_country:string;
  }
  export interface prodcount{
    iso_3166_1: string;
    name: string;
  }
  export interface spoken_language{
    english_name:string;
    iso_639_1:string;
    name: string;
  }
  export interface filmData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection:belongs_to;
    budget: number;
    genres: Array<genre>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<prodcomp>;
    production_countries: Array<prodcount>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<spoken_language>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  

  // USUARIOS
  export interface User{
    Admin: number;
    Email: string;
    Password: string;
    UserName: string;
    conectado: boolean;
    UserId: number;
  }



  // COMENTARIOS
  export interface Comment{
    UserId: number;
    Comment: string;
    Vote: number;
    Date: string;
    Username: string;
    Admin: number;
  }
  export interface Comments{
    NumComments: number;
    Comments: Array<Comment>;
    VotesSummary: number;
    Votes: number[];
  }


  // REVIEWS
  export interface Review{
    Title: string;
    Resumen: string;
    Review: string;
    Date: string;
    FilmId: number;
  }
  export interface Reviews{
    NumReviews: number;
    Reviews: Array<Review>;
  }

  // RECOMENDACIONES
  export interface Collection{
    CollectionId: number;
    CollectionName: string;
  }
  export interface Recomendation{
    Collection: string; 
    RecomendationId:number;
    Title: string;
    FilmsId: string;
    CollectionId: number;
  }
  export interface Recomendations{
    CollectionData: Collection;
    Recomendations: Recomendation[]; 
  }


   // RECOMENDACIONES
   export interface FilmLists{
    ListId: number;
    ListName: string;
    FilmsId: string;
    UserId: number;
  }