import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import './Login.css';

function Login({ onClose,  onRegisterClick}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Dang nhap thanh cong!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi đăng nhập!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-form">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="login-title">Đăng Nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form-content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <EnvelopeIcon className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <div className="input-group">
              <LockClosedIcon className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <svg className="spinner" viewBox="0 0 24 24">
                <circle className="spinner-path" cx="12" cy="12" r="10" />
              </svg>
            ) : 'Đăng Nhập'}
          </button>
        </form>
        <p className="login-footer">
          Chưa có tài khoản? <button onClick={() => {onClose(); onRegisterClick()}} className="register-btn">Đăng Ký</button>
        </p>
      </div>
    </div>
  );
}

export default Login;