import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import EditMovie from "./Movies/editMovie";
import Movie from "./Movies/Movie";
import axios from "axios";
import AddMovie from "./Movies/addMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log(res);
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <Link className="edit-button" to="/movie/add-movies">
          Add Movie
        </Link>
        <MovieList movies={movieList} />
      </Route>

      <Route exact path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          setMovieList={setMovieList}
          movieList={movieList}
        />
      </Route>

      <Route
        exact
        path="/movies/update-movies/:id"
        render={(props) => (
          <EditMovie
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />

      <Route
        exact
        path="/movie/add-movies"
        render={(props) => (
          <AddMovie
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />
    </>
  );
};

export default App;
