import { Route, HashRouter as Router, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDetails from '../MovieDetails/MovieDetails';



function App() {
  return (
    <div className="App">
      <h1>The Magnificent Movies Saga!</h1>
      <Router>        
        <Route path="/" exact component={MovieList}>
          <MovieList />
        </Route>
        <Route path="/MovieDetails/:id" exact component={MovieDetails}>
          <MovieDetails />
          <li>
            <Link to="/">Back</Link>
          </li>
        </Route>
        {/* Details page */}

        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
