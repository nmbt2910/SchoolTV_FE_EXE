import React, { useState } from "react";
import { Input, Button, Steps } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./forgottenPassword.scss";

const { Step } = Steps;

const ForgottenPassword = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Khôi Phục Mật Khẩu</h2>
        <p>Đừng lo lắng! Chúng tôi sẽ giúp bạn khôi phục tài khoản của mình</p>

        <Steps current={step} size="large" className="custom-steps">
          <Step title="" />
          <Step title="" />
          <Step title="" />
        </Steps>

        {step === 0 && (
          <>
            <label style={{ textAlign: "center" }}>Địa Chỉ Email</label>
            <Input
              size="large"
              placeholder="Nhập email đã đăng ký"
              className="custom-input"
            />
            <Button
              type="primary"
              block
              className="custom-button"
              onClick={() => setStep(1)}
            >
              Gửi Mã Xác Nhận
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <label style={{ textAlign: "center" }}>Mã Xác Nhận</label>
            <div className="otp-inputs">
              {[...Array(6)].map((_, index) => (
                <Input key={index} maxLength={1} className="otp-box" />
              ))}
            </div>
            <Button
              type="primary"
              block
              className="custom-button"
              onClick={() => setStep(2)}
            >
              Xác Nhận
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="password-container">
              <label className="custom-label">Mật Khẩu Mới</label>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Nhập mật khẩu mới"
                className="custom-password"
              />
            </div>

            <div className="password-container">
              <label className="custom-label">Xác Nhận Mật Khẩu</label>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Nhập lại mật khẩu mới"
                className="custom-password"
              />
            </div>

            <Button
              type="primary"
              block
              className="custom-button"
              onClick={() => setStep(3)}
            >
              Đặt Lại Mật Khẩu
            </Button>
          </>
        )}

        {step === 3 && (
          <div className="success-message">
            <p>Mật khẩu đã được đặt lại thành công!</p>
            <Button
              type="primary"
              block
              className="custom-button"
              href="/login"
            >
              Quay Lại Đăng Nhập
            </Button>
          </div>
        )}

        <a href="/login" className="back-link">
          Quay Lại Đăng Nhập
        </a>
      </div>
    </div>
  );
};

export default ForgottenPassword;
