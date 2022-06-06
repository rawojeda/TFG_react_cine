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
  
  export interface User{
      Admin: number;
      Email: string;
      Password: string;
      UserName: string;
      conectado: boolean;
      UserId: number;
  }