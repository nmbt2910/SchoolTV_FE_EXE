import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Badge, Dropdown, Pagination, Space } from "antd";
import { BellOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import "./Header.css";
import AOS from "aos";
import "aos/dist/aos.css";
import apiFetch from "../config/baseAPI";
import darkLogo from "../assets/dark-tv-logo.png";
import lightLogo from "../assets/light-tv-logo.png";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../utils/useNotificationAPI";
import NotificationItem from "./notification-item/NotificationItem";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { startHub, stopHub } from "../utils/NotificationHub";

dayjs.extend(utc);
dayjs.extend(timezone);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [totalNotifications, setTotalNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // First try to load from localStorage for immediate display
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUser(parsedUserData);
          console.log("Loaded user data from localStorage:", parsedUserData);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }

      // Determine if user is Admin from localStorage
      const isAdmin =
        storedUserData && JSON.parse(storedUserData).roleName === "Admin";
      const accountID = storedUserData && JSON.parse(storedUserData).accountID;

      // Then fetch fresh data from the appropriate API
      const apiUrl = isAdmin ? `accounts/admin/${accountID}` : "accounts/info";

      apiFetch(apiUrl, {
        headers: {
          accept: "*/*",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch user data: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("API response for user info:", data);

          // Handle different response structures for Admin vs regular user
          const userData = isAdmin
            ? {
                accountID: data.accountID,
                username: data.username,
                email: data.email,
                fullname: data.fullname,
                address: data.address,
                phoneNumber: data.phoneNumber,
                roleName: data.role.roleName,
              }
            : {
                accountID: data.accountID,
                username: data.username,
                email: data.email,
                fullname: data.fullname,
                address: data.address,
                phoneNumber: data.phoneNumber,
                roleName:
                  data.roleName ||
                  (storedUserData ? JSON.parse(storedUserData).roleName : null),
              };

          setUser(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          if (err.message.includes("Failed to fetch user data")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            setUser(null);
          }
        });
    }

    AOS.init({ duration: 800, once: true });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href =
        theme === "dark" ? "/img/dark-tv-logo.png" : "/img/light-tv-logo.png";
    }
  }, [theme]);

  // Check for roles in user object
  const isSchoolOwner = user && user.roleName === "SchoolOwner";
  const isAdmin = user && user.roleName === "Admin";
  const isUser = user && user.roleName === "User";

  const [pageNoti, setPageNoti] = useState(1);
  const [pageSizeNoti, setPageSizeNoti] = useState(3);

  const fetchNotifications = async () => {
    try {
      const notification = await getMyNotifications(pageNoti, pageSizeNoti);
      const values = notification?.$values ?? [];
      const sorted = values.sort((a, b) => {
        const dateA = dayjs.utc(a.createdAt).tz("Asia/Ho_Chi_Minh");
        const dateB = dayjs.utc(b.createdAt).tz("Asia/Ho_Chi_Minh");
        return dateA - dateB;
      });

      if (pageNoti === 1) {
        setTotalNotifications(sorted);
      } else {
        setTotalNotifications((prev) => [...prev, ...sorted]);
      }
    } catch (error) {
      console.error("Lỗi khi fetch thông báo:", error);
      setTotalNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [pageNoti]);

  useEffect(() => {
    const accountId = user?.accountID;

    if (!accountId) return;

    console.log("Starting SignalR hub");

    startHub(accountId, (data) => {
      console.log("📬 Nhận thông báo mới → fetch lại API");
      fetchNotifications();
      setHasNewNotification(true);
    });

    return () => {
      stopHub(); // Cleanup khi component unmount
    };
  }, [user]);

  const notificationItems = {
    items: [
      {
        label: (
          <div className="user-notification-header">
            <h3>Thông báo</h3>
          </div>
        ),
        key: "header",
      },
      {
        type: "divider",
      },
      ...(totalNotifications?.length === 0
        ? [
            {
              label: (
                <div className="user-notification-empty">
                  Không có thông báo mới
                </div>
              ),
              key: "empty",
            },
          ]
        : totalNotifications.map((item, index) => ({
            label: (
              <NotificationItem
                key={item.notificationID || index}
                title={item.title}
                message={item.message}
                createdAt={item.createdAt}
                isRead={item.isRead}
                onClick={async (e) => {
                  e.stopPropagation();
                  const response = await markNotificationAsRead(
                    item.notificationID
                  );
                }}
              />
            ),
            key: item.id || index,
          }))),

      {
        key: "footer",
        label: (
          <div
            style={{
              textAlign: "center",
              marginTop: 8,
              paddingBottom: 8, // tránh bị cắt mất
              minHeight: 32, // đảm bảo có đủ không gian
            }}
          >
            {totalNotifications.length >= pageSizeNoti && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setPageNoti(pageNoti + 1);
                }}
                style={{
                  color: "#1890ff",
                  cursor: "pointer",
                  fontWeight: 500,
                  marginRight: 12,
                }}
              >
                Hiển thị thêm
              </span>
            )}
            {pageNoti > 1 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setTotalNotifications([]);
                  setPageNoti(1);
                }}
                style={{
                  color: "#1890ff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Ẩn bớt
              </span>
            )}
          </div>
        ),
      },
    ],
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        <img
          src={theme === "dark" ? darkLogo : lightLogo}
          alt="SchoolTV Logo"
          className="logo-img"
        />
        SchoolTV
      </a>

      <button
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <a href="/" onClick={() => setIsMenuOpen(false)}>
          Trang Chủ
        </a>
        <a href="/liveList" onClick={() => setIsMenuOpen(false)}>
          Chương Trình
        </a>
        <a href="/channelList" onClick={() => setIsMenuOpen(false)}>
          Trường Học
        </a>
        {isUser && (
          <Dropdown
            menu={notificationItems}
            trigger={["click"]}
            open={open}
            onOpenChange={setOpen}
            placement="bottomRight"
            overlayClassName="user-notification-dropdown"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="user-notification-trigger">
                {hasNewNotification ? (
                  <Badge
                    dot
                    className="blinking-dot-badge"
                    onClick={() => setHasNewNotification(false)}
                  >
                    <BellOutlined className="user-notification-icon" />
                  </Badge>
                ) : (
                  <BellOutlined className="user-notification-icon" />
                )}
              </Space>
            </a>
          </Dropdown>
        )}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
        </button>

        {user ? (
          <div
            className="user-profile"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullname || "User"
              )}&background=random&size=256&font-size=0.37`}
              alt="Profile"
              className="profile-pic"
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <button
                    className="mobile-dropdown-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <p className="user-name">{user.fullname}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                {isAdmin && (
                  <>
                    <a href="/adminpage" className="dropdown-item studio-link">
                      <i className="fas fa-shield-alt"></i> Admin Dashboard
                    </a>
                    <div className="dropdown-divider"></div>
                  </>
                )}
                {isSchoolOwner && (
                  <>
                    <a
                      href="/school-studio/statistics"
                      className="dropdown-item studio-link"
                    >
                      <i className="fas fa-tv"></i> SchoolTV Studio
                    </a>
                    <a href="/package" className="dropdown-item studio-link">
                      <i className="fas fa-cart-shopping"></i> Mua Gói
                    </a>
                    <div className="dropdown-divider"></div>
                  </>
                )}
                <a href="/userProfile" className="dropdown-item">
                  <i className="fas fa-user"></i> Hồ sơ
                </a>
                <a href="#" className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </a>
              </div>
            )}
          </div>
        ) : (
          <a
            href="login"
            className="cta-button primary-button"
            onClick={() => setIsMenuOpen(false)}
          >
            Đăng Nhập
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
