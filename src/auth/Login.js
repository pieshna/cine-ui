//login with email and password by api call to backend
import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setError('');
                    sessionStorage.setItem('id', data.user._id);
                    //console.log(data.user._id)
                }
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p>password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login;