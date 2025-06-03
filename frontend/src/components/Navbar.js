import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Navbar({ onLoginClick, onRegisterClick }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img className="image-logo" src="logo.png" alt="logo" />
          <p>Hiệu Sách Online</p>
        </Link>
        <div className="navbar-links">
          <button onClick={goHome} className="navbar-link">Trang Chủ</button>
          {user ? (
            <>
              <span className="navbar-user">Xin Chào, {user.name}</span>
              <button onClick={handleLogout} className="navbar-link logout">Đăng xuất</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="navbar-link">Đăng Nhập</button>
              <button onClick={onRegisterClick} className="navbar-link">Đăng Ký</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
