import React, { useState } from 'react';
import { motion } from 'framer-motion';

const styles = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 0.3s, color 0.3s;
}

:root {
    --channel-primary: #4a90e2;
    --channel-secondary: #f0f4f8;
    --channel-text: #2c3e50;
    --channel-background: #ffffff;
    --channel-card-bg: rgba(255, 255, 255, 0.95);
    --channel-shadow: rgba(0, 0, 0, 0.1);
    --channel-hover: #357abd;
    --channel-border: #e1e8ed;
    --channel-search-bg: #f5f8fa;
    --channel-gradient-primary: linear-gradient(135deg, #4a90e2, #357abd);
    --channel-gradient-secondary: linear-gradient(135deg, #6ab0ff, #4a90e2);
    --channel-live: #ff4757;
    --channel-tab-active: #4a90e2;
    --channel-tab-inactive: #e1e8ed;
}

[data-theme="dark"] {
    --channel-primary: #4a90e2;
    --channel-secondary: #1a2634;
    --channel-text: #e1e8ed;
    --channel-background: #0f172a;
    --channel-card-bg: rgba(26, 38, 52, 0.95);
    --channel-shadow: rgba(0, 0, 0, 0.3);
    --channel-hover: #5a9de2;
    --channel-border: #2a3f52;
    --channel-search-bg: #1a2634;
    --channel-tab-inactive: #1a2634;
}

body {
    min-height: 100vh;
    background: var(--channel-background);
    color: var(--channel-text);
    overflow-x: hidden;
    padding-top: 80px; 
}

.channel-container {
    padding-top: 20px;
}

.channel-search {
    background: var(--channel-gradient-primary);
    padding: 3rem 5%;
    border-radius: 20px;
    margin: 2rem 5%;
    position: relative;
    overflow: hidden;
}

.channel-search::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
}

.channel-search-box {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
}

.channel-search-input {
    width: 100%;
    padding: 1rem 3rem;
    border: none;
    border-radius: 50px;
    background: var(--channel-search-bg);
    color: var(--channel-text);
    font-size: 1.1rem;
    box-shadow: 0 5px 15px var(--channel-shadow);
}

.channel-search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--channel-primary);
}

.channel-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 5%;
    background: var(--channel-card-bg);
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px var(--channel-shadow);
}

.channel-tab {
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    background: var(--channel-tab-inactive);
    color: var(--channel-text);
    position: relative;
    overflow: hidden;
}

.channel-tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--channel-gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
}

.channel-tab.active {
    color: white;
}

.channel-tab.active::before {
    opacity: 1;
}

.channel-tab span {
    position: relative;
    z-index: 1;
}

.channel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 5%;
}

.channel-card {
    background: var(--channel-card-bg);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px var(--channel-shadow);
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
}

.channel-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--channel-gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.channel-card:hover::before {
    opacity: 1;
}

.channel-card:hover {
    transform: translateY(-5px);
}

.channel-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;
}

.channel-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.channel-info h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--channel-text);
}

.channel-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: var(--channel-text);
    opacity: 0.8;
}

.channel-live-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--channel-live);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: channelPulse 1.5s infinite;
}

.channel-live-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
}

.channel-subscribe-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 50px;
    background: var(--channel-gradient-primary);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    text-align: center;
}

.channel-subscribe-btn.subscribed {
    background: var(--channel-secondary);
    color: var(--channel-text);
}

.channel-subscribe-btn:hover {
    transform: translateY(-2px);
    background: var(--channel-gradient-secondary);
}

.channel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5% 2rem;
}

.channel-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--channel-text);
}

.channel-counter {
    background: var(--channel-card-bg);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--channel-text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.channel-counter i {
    color: var(--channel-primary);
}

.channel-empty {
    text-align: center;
    padding: 3rem;
    color: var(--channel-text);
}

.channel-empty i {
    font-size: 4rem;
    color: var(--channel-primary);
    margin-bottom: 1rem;
}

.channel-empty h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.channel-empty p {
    color: var(--channel-text);
    opacity: 0.8;
}

.channel-load-more {
    margin: 3rem auto;
    padding: 1rem 3rem;
    background: var(--channel-gradient-primary);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px var(--channel-shadow);
}

.channel-load-more:hover {
    transform: translateY(-2px);
    background: var(--channel-gradient-secondary);
}

.channel-load-more i {
    transition: transform 0.3s ease;
}

.channel-load-more:hover i {
    transform: translateY(2px);
}

@keyframes channelPulse {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .channel-grid {
        grid-template-columns: 1fr;
        margin: 2rem;
    }
    .channel-search,
    .channel-tabs,
    .channel-header {
        margin: 2rem;
    }
}

.channel-no-results {
    width: 100%;
    text-align: center;
    padding: 3rem;
    background: var(--channel-card-bg);
    border-radius: 15px;
    box-shadow: 0 10px 30px var(--channel-shadow);
}

.channel-no-results i {
    font-size: 3rem;
    color: var(--channel-primary);
    margin-bottom: 1rem;
}

.channel-no-results h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--channel-text);
}

.channel-no-results p {
    color: var(--channel-text);
    opacity: 0.8;
}
`;

const ChannelList = () => {
  // State management
  const [activeTab, setActiveTab] = useState('explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [universities, setUniversities] = useState([
    {
      name: "Đại học Bách Khoa Hà Nội",
      followers: "50K+",
      videos: "200+",
      isLive: true,
      isSubscribed: true
    },
    {
        name: "Đại học Quốc Gia Hà Nội",
        followers: "45K+",
        videos: "180+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Kinh tế Quốc dân",
        followers: "40K+",
        videos: "150+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Y Hà Nội",
        followers: "38K+",
        videos: "120+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Học viện Ngoại giao",
        followers: "35K+",
        videos: "100+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Ngoại thương",
        followers: "33K+",
        videos: "90+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Xây dựng Hà Nội",
        followers: "30K+",
        videos: "85+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Thương mại",
        followers: "28K+",
        videos: "80+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Học viện Ngân hàng",
        followers: "25K+",
        videos: "75+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Luật Hà Nội",
        followers: "23K+",
        videos: "70+",
        isLive: false,
        isSubscribed: false
    },
    {
        name: "Đại học Bách Khoa TP.HCM",
        followers: "48K+",
        videos: "210+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Sư phạm Hà Nội",
        followers: "42K+",
        videos: "160+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Hà Nội",
        followers: "39K+",
        videos: "140+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Đà Nẵng",
        followers: "36K+",
        videos: "110+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Cần Thơ",
        followers: "33K+",
        videos: "95+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Học viện Hành chính Quốc gia",
        followers: "31K+",
        videos: "85+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học FPT",
        followers: "30K+",
        videos: "100+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Bảo Lộc",
        followers: "28K+",
        videos: "75+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Phan Thiết",
        followers: "27K+",
        videos: "70+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Mở TP.HCM",
        followers: "25K+",
        videos: "65+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Tôn Đức Thắng",
        followers: "24K+",
        videos: "80+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Nha Trang",
        followers: "23K+",
        videos: "95+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Hùng Vương",
        followers: "22K+",
        videos: "90+",
        isLive: false,
        isSubscribed: false
    },
    {
        name: "Đại học Kinh tế TP.HCM",
        followers: "20K+",
        videos: "85+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Học viện An ninh Nhân dân",
        followers: "19K+",
        videos: "75+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Kiến trúc Hà Nội",
        followers: "18K+",
        videos: "65+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Thái Nguyên",
        followers: "17K+",
        videos: "60+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Sài Gòn",
        followers: "16K+",
        videos: "55+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Quốc tế Hồng Bàng",
        followers: "15K+",
        videos: "50+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Thủy lợi",
        followers: "14K+",
        videos: "45+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Kinh tế Quốc dân Hà Nội",
        followers: "13K+",
        videos: "40+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Phòng cháy chữa cháy",
        followers: "12K+",
        videos: "35+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Tài chính - Marketing",
        followers: "11K+",
        videos: "30+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Bưu chính Viễn thông",
        followers: "10K+",
        videos: "25+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Công nghiệp TP.HCM",
        followers: "9K+",
        videos: "20+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Công nghệ TP.HCM",
        followers: "8K+",
        videos: "15+",
        isLive: true,
        isSubscribed: true
    },
    {
        name: "Đại học Văn hóa Hà Nội",
        followers: "7K+",
        videos: "10+",
        isLive: false,
        isSubscribed: false
    },
    {
        name: "Đại học Y Dược TP.HCM",
        followers: "6K+",
        videos: "5+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Kỹ thuật Y Dược Đà Nẵng",
        followers: "5K+",
        videos: "3+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Học viện Tòa án",
        followers: "4K+",
        videos: "2+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Học viện Tài chính",
        followers: "3K+",
        videos: "1+",
        isLive: false,
        isSubscribed: true
    },
    {
        name: "Đại học Bạc Liêu",
        followers: "2K+",
        videos: "5+",
        isLive: true,
        isSubscribed: false
    },
    {
        name: "Đại học Hòa Bình",
        followers: "1K+",
        videos: "3+",
        isLive: false,
        isSubscribed: true
    }

  ]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  const handleSubscription = (schoolName) => {
    setUniversities(prevUniversities => 
      prevUniversities.map(uni => 
        uni.name === schoolName 
          ? { ...uni, isSubscribed: !uni.isSubscribed }
          : uni
      )
    );
  };

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'subscribed') {
      return matchesSearch && uni.isSubscribed;
    }
    return matchesSearch;
  });

  const SchoolCard = ({ university }) => (
    <motion.div 
      className="channel-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {university.isLive && (
        <div className="channel-live-badge">
          <span>LIVE</span>
        </div>
      )}
      <div className="channel-logo">
        <img 
          src={`https://picsum.photos/80/80?random=${Math.random()}`} 
          alt={university.name}
        />
      </div>
      <div className="channel-info">
        <h3>{university.name}</h3>
        <div className="channel-stats">
          <span><i className="fas fa-users"></i> {university.followers}</span>
          <span><i className="fas fa-video"></i> {university.videos}</span>
        </div>
      </div>
      <button 
        className={`channel-subscribe-btn ${university.isSubscribed ? 'subscribed' : ''}`}
        onClick={() => handleSubscription(university.name)}
      >
        {university.isSubscribed ? 'Đã đăng ký' : 'Đăng ký'}
      </button>
    </motion.div>
  );

  return (
    <div className="channel-container">
      <motion.div 
        className="channel-search"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="channel-search-box">
          <i className="fas fa-search channel-search-icon"></i>
          <input 
            type="text" 
            className="channel-search-input" 
            placeholder="Tìm kiếm trường học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="channel-tabs">
        {['explore', 'subscribed'].map(tab => (
          <motion.div
            key={tab}
            className={`channel-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              <i className={`fas fa-${tab === 'explore' ? 'compass' : 'star'}`}></i>
              {tab === 'explore' ? ' Khám Phá' : ' Đã Đăng Ký'}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="channel-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="channel-title">
          {activeTab === 'explore' ? 'Khám Phá Trường Học' : 'Trường Đã Đăng Ký'}
        </h2>
        <div className="channel-counter">
          <i className={`fas fa-${activeTab === 'explore' ? 'school' : 'check-circle'}`}></i>
          <span>{filteredUniversities.length} trường</span>
        </div>
      </motion.div>

      <motion.div 
        className="channel-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((university, index) => (
            <SchoolCard key={index} university={university} />
          ))
        ) : (
          <div className="channel-empty">
            <i className="fas fa-star"></i>
            <h3>Không có trường học</h3>
            <p>Hãy khám phá và đăng ký các trường bạn quan tâm</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Create a style element and append it to the head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default ChannelList;