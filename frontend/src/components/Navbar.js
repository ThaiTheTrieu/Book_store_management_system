import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">Hiệu Sách Online</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Trang Chủ</Link>
          {user ? (
            <>
              <span className="navbar-user">Xin Chào, {user.name}</span>
              <button onClick={handleLogout} className="navbar-link logout">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Đăng Nhập</Link>
              <Link to="/register" className="navbar-link">Đăng Ký</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;