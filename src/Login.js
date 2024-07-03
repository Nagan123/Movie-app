import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


const Login = ({ setUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
   
   const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/home');
    } catch (error) {
      Swal.fire('Error', 'Invalid email or password', 'error');
    }
  };

  return (
    <div>
      <section>
        <div className="box">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="container">
            <div className="form">
              <h2>LOGIN to Movie App</h2>
               <form onSubmit={handleLogin}>
                <div className="inputBx">
                  <input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				  />
                  <span>Email</span>
                  <FontAwesomeIcon icon={faEnvelope} className="fas" />
                </div>
                
                <div className="inputBx">
                  <button type="submit">Log in</button>
                </div>
                <p>If you are a new user <Link to='/signup'>Click Here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
