import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import "./ForgetPassword.css";

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleResetPassword = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Password reset email sent. Check your inbox.');
            })
            .catch((error) => {
                setMessage(`Error: ${error.message}`);
            });
    };

    return (
        <div className="forget-password-container">
            <h2>Forgot Password</h2>
            <input
                className="forget-password-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forget-password-button" onClick={handleResetPassword}>Reset Password</button>
            {message && <p className="forget-password-message">{message}</p>}
        </div>
    );
}

export default ForgetPassword;