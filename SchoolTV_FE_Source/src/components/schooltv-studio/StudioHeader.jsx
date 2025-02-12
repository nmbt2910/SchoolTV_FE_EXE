import React, { useContext, useEffect, useState } from "react";
import "./StudioHeader.scss";
import { Badge, Button, Flex, Image } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
import { Dropdown } from "antd";
import { IoNotifications } from "react-icons/io5";
import { use } from "react";

function StudioHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [countNotification, setCountNotification] = useState(0);

  const items = [
    {
      label: "First notification",
      key: "0",
    },
    {
      label: "Second notification",
      key: "1",
    },
    {
      label: "Third notification",
      key: "2",
    },
  ];

  useEffect(() => {
    setCountNotification(items.length);
  }, [items]);

  return (
    <div className="studio-header-container">
      <Flex justify="space-between" align="center">
        <div>
          <a href="#" className="logo">
            <i className="fas fa-tv"></i> SchoolTV Studio
          </a>
        </div>

        <Flex align="center">
          <button
            style={{ marginRight: "35px" }}
            className="schoolStudio-switch-button"
          >
            Chuyển đến SchoolTV
          </button>

          <button
            onClick={toggleTheme}
            className="theme-toggle studio-header-icon"
          >
            {theme === "light" ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
          </button>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            className="studio-header-icon"
          >
            <Badge count={countNotification} overflowCount={99}>
              <IoNotifications />
            </Badge>
          </Dropdown>

          <Image
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
            preview={false}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default StudioHeader;
