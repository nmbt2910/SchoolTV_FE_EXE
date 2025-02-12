import React, { useContext, useEffect } from 'react';
import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeContext } from "../context/ThemeContext";
import { Link } from 'react-router-dom';


const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    return () => {
      // Cleanup code if needed
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        <i className="fas fa-tv"></i> SchoolTV
      </a>
      <nav className="nav-links">
        <a href="#">Trang Chủ</a>
        <a href="#">Khám Phá</a>
        <a href="#">Trường Học</a>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </button>
        <a href="login" className="cta-button primary-button" onClick={() => setIsMenuOpen(false)}>
          Đăng Nhập
        </a>
      </nav>
    </header>
  );
};

export default Header;