import React from 'react';
import './Home.css';
import AutoSlider from '../components/AutoSlider';

function Home({ onLoginClick, onRegisterClick }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="home-container">
      <h1 className="home-title">Chào mừng đến với Hiệu Sách Oline</h1>
      {user ? (
        <p className="home-message">Xin chào, {user.name}! Bạn có thể xem danh sách và đặt hàng.</p>
      ) : (
        <p className="home-message">
          Vui lòng <button onClick={onLoginClick} className="login-btn">Đăng Nhập</button> hoặc <button onClick={onRegisterClick} className="register-btn">Đăng Ký</button> để bắt đầu.
        </p>
      )}
      <AutoSlider />
    </div>
  );
}

export default Home;