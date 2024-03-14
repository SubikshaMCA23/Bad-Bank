import React, { useState } from 'react';
import "./styles.css";

function Deposit() {
    const [amount, setAmount] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
    const [notification, setNotification] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (amount <= 0) {
            alert('Enter a valid amount.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, amount: parseFloat(amount) })
            });

            const data = await response.json();

            if (response.ok) {
                const updatedUser = data.user;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setNotification(`Successfully deposited $${amount}`);
                setAmount(0); // Clear the input field
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Error during deposit. Please try again.');
        }
    };

    return (
        <div>
            <div className="login-form">
            <h2>Deposit</h2>
            <p>Current Balance: ${user.balance}</p>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Amount" value={amount} onChange={handleAmountChange} />
                <button type="submit">Deposit</button>
            </form>
            {notification && <div className="notification">{notification}</div>}
            </div>
        </div>
    );
}

export default Deposit;
