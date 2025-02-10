import React, { useContext, useEffect } from 'react';
import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({ duration: 800, once: true });

    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <header className="header">
      <a href="#" className="logo">
        <i className="fas fa-tv"></i> SchoolTV
      </a>
      <nav className="nav-links">
        <a href="#">Trang Chủ</a>
        <a href="#">Khám Phá</a>
        <a href="#">Trường Học</a>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
        <a href="#" className="cta-button primary-button">
          Đăng Nhập
        </a>
      </nav>
    </header>
  );
};

export default Header;
