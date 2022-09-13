import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Create() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const movie = { title, genre, year, director };
        fetch(`${process.env.REACT_APP_API}/movie/create`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setRedirect(true);
                }
            })
    }

    if (redirect) {
        return <Navigate to="/movie/list" />
    }

    return (
        <div>
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Genre</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <label>Year</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                <label>Director</label>
                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Create;