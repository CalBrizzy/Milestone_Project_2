import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;