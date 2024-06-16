import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieList() {

  const history = useHistory();

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);


  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  function gotoSpecificMovie(id) {
    history.push(`/MovieDetails/${id}`);
    return;
  }

  return (
    <main>
      <h1>Movie List:</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id} onClick={() => gotoSpecificMovie(movie.id)}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} data-testid="toDetails"/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
