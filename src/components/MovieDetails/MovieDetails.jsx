import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieDetails.css";
import App from "../App/App";
import MovieList from "../MovieList/MovieList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function MovieDetails() {
  const dispatch = useDispatch();
  const [getMovie, setMovie] = useState([]);
  const [getGenre, setGenre] = useState([]);
  const { id } = useParams(); // destructure id

  // can use to get movie title and all that junk
  const movies = useSelector((store) => store.movies);
  // this may be more preferable to get movie title and junk
  const genreList = useSelector((store) => store.genres);
  console.log("genreList from store yo:", genreList);
  // genre list will help us get assosciated genres with specific ids


  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
    const fetchMovie = async () => {
      try {
        const getResponse = await axios.get(`/api/movies/${id}`);
        setMovie(getResponse.data);
        console.log("Movie data set is: ", getResponse.data);
        const genreRespone = await axios.get(`/api/genres/${id}`);
        setGenre(genreRespone.data);
        console.log("Genre data set is: ", genreRespone.data);
      } catch (error) {
        console.log("Error getting the movie", error);
      }
    };
    fetchMovie();
  }, [id]);


// Nested Function getGenres Overview:
//
// Function getGenres is for iterating over 
// the getGenre useState array,
// it checks if genre_id matches any id 
// in our stored genreList essentially, 
// it looks over the list of available genres
// and compares them to the genre id's of the currently selected
// movie, if there is a match (or multiple matches) they
// get pushed to the newly established array genreNames

// Nested Function getGenres Exact Description:
//
// Function is iterating over getGenre (with loop variable genre),
// which is an array of objects with id, movie_id, and genre_id 
// properties, then the nested loop inside iterates over genreList 
// (with loop variable item), which is an array of objects that have 
// a genre id and specific genre name inside each. After doing this
// it checks the id's across each of these (genre and item) and
// pushes to our newly established empty array "genreNames"

  function getGenres(genreList, getGenre) {
    console.log("in getGenres")
    const genreNames = []
    for (const genre of getGenre) {
      for (const item of genreList) {
        if (genre.genre_id === item.id) {
          genreNames.push(item.name)
        }
      }
    }
    return genreNames;
  }


  return (
    <div className="MovieDetails">
      <h1>Movie Details</h1>
      <div data-testid="movieDetails">
        <h3>{getMovie.title}</h3>
        <img src={getMovie.poster} alt={getMovie.title} />
        <h4>{getMovie.description}</h4>
      </div>
      <h2>Genres:</h2>
      <ul>
        {getGenres(genreList, getGenre).map((genreName, index) => (
          <li key={index}>{genreName}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
