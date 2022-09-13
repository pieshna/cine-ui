//make a register view with a form that has email, name, lastname , password, identity, telephone, payment method and a submit button that sends the data to the backend
import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [identity, setIdentity] = useState('');
    const [telephone, setTelephone] = useState('');
    const [payment, setPayment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, lastname, password, identity, telephone, payment })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setError('');
                }
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p>name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p>lastname</p>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <p>password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p>identity</p>
                <input type="text" value={identity} onChange={(e) => setIdentity(e.target.value)} />
                <p>telephone</p>
                <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                <p>payment</p>
                <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Register;