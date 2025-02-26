import { useState, useEffect } from "react";
import { Bell, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import "./upcomingDetail.scss";

const UpComingDetail = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <main className="main-content">
        <div className="event-header">
          <h1 className="event-title event-big-title">
            Lễ Tốt Nghiệp 2023 - ĐH Bách Khoa Hà Nội
          </h1>
          <div className="event-meta">
            <span className="meta-item">
              <Calendar className="meta-icon" />
              25/12/2023 - 14:00
            </span>
            <span className="meta-item">
              <MapPin className="meta-icon" />
              Nhà hát lớn Hà Nội
            </span>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="main-section">
            <div className="info-card">
              <h2 className="section-title">Về sự kiện</h2>
              <p className="description">
                Chúng tôi tại Career Bliss Academy hân hạnh được mời bạn tham dự
                Lễ Trao Bằng Tốt Nghiệp, nơi chúng ta cùng nhau tôn vinh những
                nỗ lực và thành tựu của các học viên xuất sắc.
              </p>
              <blockquote className="event-quote">
                "Khi mọi người thực sự khai phá tiềm năng của bản thân và áp
                dụng những kỹ năng đã học vào cuộc sống, họ không chỉ thay đổi
                bản thân mà còn tạo ra sự khác biệt trong cộng đồng."
              </blockquote>
            </div>

            <div className="video-section">
              <h2 className="section-title">Video mới nhất</h2>
              <div className="video-grid">
                <motion.div className="video-card" whileHover={{ scale: 1.02 }}>
                  <div className="video-thumbnail">
                    <img
                      src="https://picsum.photos/800/450?random=1"
                      alt="Video thumbnail"
                    />
                    <div className="video-duration">10:25</div>
                  </div>
                  <div className="video-info">
                    <h3>Highlights Lễ Tốt Nghiệp 2022</h3>
                    <p>10,234 lượt xem</p>
                  </div>
                </motion.div>

                <motion.div className="video-card" whileHover={{ scale: 1.02 }}>
                  <div className="video-thumbnail">
                    <img
                      src="https://picsum.photos/800/450?random=2"
                      alt="Video thumbnail"
                    />
                    <div className="video-duration">15:30</div>
                  </div>
                  <div className="video-info">
                    <h3>Phỏng vấn Tân Cử Nhân</h3>
                    <p>8,567 lượt xem</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="notification-card">
              <h3>Nhận thông báo cho sự kiện này</h3>
              <motion.button
                className="notify-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bell className="icon" />
                Đặt lịch nhắc
              </motion.button>
            </div>

            <div className="related-events">
              <h3>Sự kiện liên quan</h3>
              <div className="events-list">
                <motion.div className="event-item" whileHover={{ scale: 1.02 }}>
                  <img
                    src="https://picsum.photos/200/200?random=3"
                    alt="Event"
                  />
                  <div>
                    <h4>Hội thảo Khoa học 2023</h4>
                    <time>30/12/2023</time>
                  </div>
                </motion.div>

                <motion.div className="event-item" whileHover={{ scale: 1.02 }}>
                  <img
                    src="https://picsum.photos/200/200?random=4"
                    alt="Event"
                  />
                  <div>
                    <h4>Triển lãm Công nghệ</h4>
                    <time>05/01/2024</time>
                  </div>
                </motion.div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UpComingDetail;
