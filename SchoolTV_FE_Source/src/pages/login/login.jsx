import "./login.scss";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Divider,
  Form,
  Input,
  notification,
} from "antd";
import { useResponsive } from "antd-style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://localhost:44316/api/accounts/login";

function Login() {
  const { xxl } = useResponsive();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(API_URL, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        notification.success({
          message: "Đăng nhập thành công!",
          description: "Chào mừng bạn quay trở lại!",
          placement: "topRight",
          duration: 3,
        });

        localStorage.setItem("authToken", response.data.token);
        navigate("/watchHome");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);

      if (error.response?.status === 401) {
        notification.error({
          message: "Đăng nhập thất bại!",
          description: "Email hoặc mật khẩu của bạn đã sai! Hãy kiểm tra lại.",
          placement: "topRight",
          duration: 5,
        });
      } else {
        notification.error({
          message: "Lỗi hệ thống!",
          description: "Không thể kết nối đến máy chủ, vui lòng thử lại sau.",
          placement: "topRight",
          duration: 5,
        });
      }
    }
  };

  const onFinishFailed = () => {
    notification.warning({
      message: "Vui lòng kiểm tra lại thông tin đăng nhập!",
      description: "Bạn cần nhập đầy đủ thông tin trước khi đăng nhập.",
      placement: "topRight",
      duration: 5,
    });
  };

  return (
    <div className="login_background">
      <Form
        layout="vertical"
        className="login_form"
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1>Chào mừng trở lại</h1>
        <p>Đăng nhập để tiếp tục hành trình của bạn</p>

        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <ConfigProvider componentSize={xxl ? "middle" : "small"}>
            <Button
              type="default"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '10px',
                fontSize: '1em',
                fontWeight: '500'
              }}
              icon={
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  alt="Google Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              }
              onClick={() => window.location.href = "https://www.google.com"}
            >
              Tiếp tục với Google
            </Button>
          </ConfigProvider>
        </Form.Item>

        <div className="login_divider">
          <Divider>Hoặc</Divider>
        </div>

        <Form.Item
          label="Địa chỉ Email"
          name="email"
          className="login_input"
          rules={[
            {
              required: true,
              message: "Nhập email của bạn!",
            },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          className="login_input"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu của bạn!",
            },
          ]}
        >
          <Input.Password style={{ 
            height: 'auto',
            '& .ant-input': {
              height: '100%',
              padding: '12px 15px'
            }
          }} />
        </Form.Item>

        <div className="remember-password-container">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>

        <div className="login_btn">
          <Button type="primary" htmlType="submit" className="login_btn_ant">
            Đăng nhập
          </Button>
        </div>

        <div className="login_register">
          <span>Chưa có tài khoản?</span>
          <a href="/register">Đăng ký ngay</a>
        </div>
      </Form>
    </div>
  );
}

export default Login;