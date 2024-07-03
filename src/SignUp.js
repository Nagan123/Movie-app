import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faKey, faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', { username, email, password });
      Swal.fire('Success', 'User registered successfully', 'success');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: 'Error',
          text: 'Email already registered',
          icon: 'error',
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire('Error', 'Registration failed', 'error');
      }
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
              <h2>SIGNUP to Movie App</h2>
              <form onSubmit={handleSignUp}>
                <div className="inputBx">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span>User Name</span>
                  <FontAwesomeIcon icon={faUserCircle} className="fas" />
                </div>

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

                <div className="inputBx password">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span>Password</span>
                  <a href="#" className="password-control" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                  </a>
                  <FontAwesomeIcon icon={faKey} className="fas" />
                </div>

                <div className="inputBx">
                  <button type="submit">Sign Up</button>
                </div>
                <p>If you are already registered <Link to='/'>Click Here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
