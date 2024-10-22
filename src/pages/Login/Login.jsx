import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    // For now, just navigate back to Home
    if (email === 'admin@example.com' && password === 'password') {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleCheck = () => {
    setRememberMe(!rememberMe)
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}

        <div className="button-container">
          <div className="login-box">
            <label> Remember Me
            <input style={{margin:"10px"}}type="checkbox" onChange={handleCheck}/>
            </label>
            <button className="button" type="submit">Login</button>
          </div>
          <Link className="forgot-button" to='/forgot-password'>Forgot Password</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
