import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddMovie = (props) => {
  const [addMovie, setAddMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const history = useHistory();

  const { title, director, metascore, stars } = addMovie;

  const addingMovie = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", addMovie)
      .then((resp) => {
        console.log(resp);
        props.setMovieList(resp.data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setAddMovie({
      ...addMovie,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "stars") {
      setAddMovie({ ...addMovie, stars: e.target.value.split(",") });
    }
    if (e.target.name === "metascore") {
      setAddMovie({ ...addMovie, metascore: e.target.value * 1 });
    }
  };

  return (
    <div className="edit-form">
      <form className="edit-form" onSubmit={addingMovie}>
        <label>
          Title:
          <input name="title" value={title} onChange={handleChange} required />
        </label>
        <label>
          Director:
          <input
            name="director"
            value={director}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Metascore:
          <input
            name="metascore"
            value={metascore}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stars:
          <input name="stars" value={stars} onChange={handleChange} required />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default AddMovie;
