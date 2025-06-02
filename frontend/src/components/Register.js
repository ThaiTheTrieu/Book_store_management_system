import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from '@heroicons/react/24/solid';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Thêm state cho số điện thoại
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        phone, // Thêm số điện thoại vào payload
        password,
      });
      alert('Dang ky thanh cong! Vui long dang nhap.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Loi dang ky!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Đăng Ký</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="login-form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Họ và Tên</label>
            <div className="input-group">
              <UserIcon className="input-icon" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
          </div>
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
                placeholder="Nhập email"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Số Điện Thoại</label>
            <div className="input-group">
              <PhoneIcon className="input-icon" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="Nhập số điện thoại"
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
            ) : 'Đăng Ký'}
          </button>
        </form>
        <p className="login-footer">
          Đã có tài khoản? <a href="/login" className="footer-link">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
}

export default Register;