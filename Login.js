import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useAuth } from './AuthContext'; 

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert('Please fill out all fields.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setNotification('Successfully logged in!');
                login();
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                if (data.user.isActive) {
                    navigate('/deposit');
                } else {
                    navigate('/');
                }
            } else {
                alert(data.error);
                setLoading(false);
            }
        } catch (err) {
            alert('Error during login. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="login-form">
            <h2 id='logintxt'>Login</h2>
            {notification && <div className="notification">{notification}</div>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                <button type="submit" disabled={loading}>Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;
