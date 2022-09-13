//list a movie by api call to backend and display the movie details in a table with links to update and delete the movie from the database
//the items in the table are: title, genre, year, director
//the links in the table are: update, delete and add movie
//when add movie is clicked, show the create form that is imported from src\movies\Create.js and when is submited show this page with the new movie added to the list

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function List() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/movie/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setMovies(data);
        }
      });
  }, []);
  const url = "https://img.freepik.com/vector-premium/plantilla-caja-luz-retro-estilo-realista-bombilla-aislado-fondo-transparente-cartel-fiesta-promocion-publicitaria-venta-cartelera-cine-bar-show-o-restaurante-vector-10-eps_111651-1090.jpg?w=2000"

  return (
    <div className="p4 m-8">
      <h1 className="text-center font-bold text-4xl m-4">Movies</h1>
      <div className="grid grid-cols-4 center mb-10">
        {movies.map((movie) => (
          <Link to={`/asiento/list/${movie._id}`}>
            <div
              className="border border-texto p-3 rounded-lg col-auto mx-3"
              key={movie._id}
            >
                <img src={url} alt="" className="w-40 h-50 m-auto rounded-xl"/>
              <p className="font-semibold text-md text-center">{movie.title}</p>
              <p className="px-4 py-1">Genero: {movie.genre}</p>
              <p className="px-4 py-1">Año: {movie.year}</p>
              <p className="px-4 py-1">Director: {movie.director}</p>
              <p className="text-center py-2 text-xs">Compralo por solo: Q.25</p>
            </div>
          </Link>
        ))}
      </div>
      {/* <Link className="border border-texto p-3 ml-5 border " to="/movie/create">Add Movie</Link> */}
    </div>
  );
}

export default List;
