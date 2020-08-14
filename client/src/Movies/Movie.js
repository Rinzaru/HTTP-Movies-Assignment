import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = (movieId) => {
    history.push(`/movies/update-movies/${movieId}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((resp) => {
        const deleteMovies = movieList.filter(
          (movie) => movie.id !== resp.data
        );
        setMovieList(deleteMovies);
        history.push("/");
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="save-button" onClick={saveMovie}>
        Save
      </button>

      <button className="edit-button" onClick={() => editMovie(movie.id)}>
        Edit Movie!
      </button>

      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
