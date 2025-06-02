import React from 'react';
import './Home.css';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-container">
      <h1 className="home-title">Chào mừng đến với Hiệu Sách Oline</h1>
      {user ? (
        <p className="home-message">Xin chào, {user.name}! Bạn có thể xem danh sách và đặt hàng.</p>
      ) : (
        <p className="home-message">
          Vui lòng <a href="/login" className="home-link">Đăng Nhập</a> hoặc <a href="/register" className="home-link">Đăng Ký</a> để bắt đầu.
        </p>
      )}
    </div>
  );
}

export default Home;