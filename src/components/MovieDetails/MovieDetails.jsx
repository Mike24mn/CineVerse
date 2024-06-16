import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetails.css";
import App from "../App/App";
import MovieList from "../MovieList/MovieList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function MovieDetails() {

  const dispatch = useDispatch();

  const {id} = useParams() // destructure id


  // can use to get movie title and all that junk
  const movies = useSelector(store => store.movies); 
  // this may be more preferable to get movie title and junk
  const genreList = useSelector((store) => store.genres);
  // genre list will help us get assosciated genres with specific ids



  // need to change everything below here:
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.map(movie => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title}/>
            </div>
          );
        })}
      <h1>Genres</h1>
      {genreList.map(genre => (
        <div key={genre.id}>{genre.name}</div>
      ))}
    </div>
  );
};

export default MovieDetails;
