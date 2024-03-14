import React, { useState } from 'react';
import "./styles.css";
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        balance: 0,   
    });

    const [notification, setNotification] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password ) {
            alert('Please fill out all fields.');
            return;
        }

        if (formData.password.length < 8) {
            alert('Password should be at least 8 characters.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }
            
            if(data.error) {
                alert(data.error);
            } else {
                console.log('User Registered:', data.user);
                setNotification('Successfully created an account!');
                login(); 
                navigate('/deposit'); 
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to register. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="register-form">
                <h2>Register</h2>
                {notification && <div className="notification">{notification}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
