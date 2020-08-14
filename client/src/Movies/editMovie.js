import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const EditMovie = (props) => {
  const [editMovie, setEditMovie] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((resp) => {
        console.log(resp.data);
        setEditMovie(resp.data);
      })
      .catch((err) => console.log(err));
    console.log(editMovie, "edits");
  }, [id]);

  const handleChange = (e) => {
    setEditMovie({
      ...editMovie,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "stars") {
      setEditMovie({ ...editMovie, stars: e.target.value.split(",") });
    }
    if (e.target.name === "metascore") {
      setEditMovie({ ...editMovie, metascore: e.target.value * 1 });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, editMovie)
      .then((res) => {
        const newMovies = props.movieList.map((film) => {
          if (film.id === res.data.id) {
            return (film = res.data);
          }
          return film;
        });
        props.setMovieList(newMovies);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="movie-card">
      <form className="edit-form" onSubmit={submitHandler}>
        <label>
          Title:
          <input
            name="title"
            value={editMovie.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Director:
          <input
            name="director"
            value={editMovie.director}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Metascore:
          <input
            name="metascore"
            value={editMovie.metascore}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stars:
          <textarea
            name="stars"
            value={editMovie.stars}
            onChange={handleChange}
            required
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditMovie;
