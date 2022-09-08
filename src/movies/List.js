//list a movie by api call to backend and display the movie details in a table with links to update and delete the movie from the database
//the items in the table are: title, genre, year, director
//the links in the table are: update, delete and add movie
//when add movie is clicked, show the create form that is imported from src\movies\Create.js and when is submited show this page with the new movie added to the list

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Create from './Create';

function List() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/movie/list')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setMovies(data);
                }
            })
    }, [])

    return (
        <div>
            <h1>Movies</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>{movie.director}</td>
                            <td><Link to={`/movie/update/${movie._id}`}>Update</Link></td>
                            <td><Link to={`/movie/delete/${movie._id}`}>Delete</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/movie/create">Add Movie</Link>
        </div>
    )
}

export default List;