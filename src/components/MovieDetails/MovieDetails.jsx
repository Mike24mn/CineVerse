import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetails.css";
import App from "../App/App";
import MovieList from "../MovieList/MovieList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function MovieDetails() {

  const dispatch = useDispatch();
  const [getMovie, setMovie] = useState([])
  const [getGenre, setGenre] = useState([])
  const {id} = useParams() // destructure id


  // can use to get movie title and all that junk
  const movies = useSelector(store => store.movies); 
  // this may be more preferable to get movie title and junk
  const genreList = useSelector((store) => store.genres);
  // genre list will help us get assosciated genres with specific ids



  // need to change everything below here:
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
    const fetchMovie = async () => {
      try {
        const getResponse = await axios.get(`/api/movies/${id}`)
        setMovie(getResponse.data)
        console.log("Movie data set is: ", getResponse.data);
        const genreRespone = await axios.get(`/api/genres/${id}`)
        setGenre(genreRespone.data)
        console.log("Genre data set is: ", genreRespone.data);
      }
      catch (error) {
        console.log("Error getting the movie", error);
      }
      }
      fetchMovie();
  }, [id]);


  return (
    <div>
      <h1>Movie Details</h1>
      <div>
        <h3>{getMovie.title}</h3>
        <img src={getMovie.poster} alt={getMovie.title} />
        <h4>{getMovie.description}</h4>
      </div>
      <h2>Genres:</h2>
      <ul>
        {getGenre.map((genre) => (
          <li key={genre.id}>{genre.genre_id.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
