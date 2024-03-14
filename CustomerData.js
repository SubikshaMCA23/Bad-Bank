import React, { useState, useEffect } from 'react';
import "./styles.css";

function CustomerData() {
    const [data, setData] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching users from API:", error);
        }
    };

    useEffect(() => {
        fetchUsers();

        const updateDataListener = () => {
            fetchUsers();
        };

        window.addEventListener('userDataUpdated', updateDataListener);

        return () => {
            window.removeEventListener('userDataUpdated', updateDataListener);
        };
    }, []);

    return (
        <div className="customer-data-container">
            <h2>Customer Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Active</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>${user.balance ? user.balance.toFixed(2) : '0.00'}</td>
                            <td className={user.isActive ? 'active-status' : 'inactive-status'}>
                                {user.isActive ? 'Yes' : 'No'}
                            </td>
                            <td>{user.gender || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerData;
