import { useState } from "react";
import "./payment.css";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(0);

  const paymentMethods = [
    {
      id: 0,
      name: "Thẻ Visa/Mastercard",
      description: "Thanh toán an toàn qua cổng VNPAY",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      id: 1,
      name: "Ví MoMo",
      description: "Quét mã QR để thanh toán",
      image:
        "https://homepage.momocdn.net/fileuploads/svg/momo-file-240411162904.svg",
    },
    {
      id: 2,
      name: "Chuyển khoản ngân hàng",
      description: "Hỗ trợ +40 ngân hàng tại Việt Nam",
      image:
        "https://theme.hstatic.net/200000467803/1000988268/14/cart_pay_2.png?v=815",
    },
  ];

  return (
    <>

      <div className="checkout-container">
        <div className="checkout-form">
          <h2 className="section-title">Thông tin thanh toán</h2>

          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input type="tel" className="form-input" placeholder="0xxxxxxxxx" />
          </div>

          <h2 className="section-title">Phương thức thanh toán</h2>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-method ${
                  selectedPayment === method.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <img src={method.image} alt={method.name} />
                <div>
                  <div style={{ fontWeight: 500 }}>{method.name}</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748B" }}>
                    {method.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h2 className="section-title">Tóm tắt đơn hàng</h2>

          <div className="order-item">
            <div>
              <div style={{ fontWeight: 500 }}>Gói Chuyên Nghiệp</div>
              <div style={{ fontSize: "0.875rem", color: "#64748B" }}>
                Thời hạn: 12 tháng
              </div>
            </div>
            <div style={{ fontWeight: 500 }}>5.988.000₫</div>
          </div>

          <div className="order-item">
            <div style={{ color: "#64748B" }}>Giảm giá</div>
            <div style={{ color: "var(--success-color)" }}>-598.800₫</div>
          </div>

          <div className="order-total">
            <div>Tổng cộng</div>
            <div>5.389.200₫</div>
          </div>

          <button className="checkout-button">Thanh toán ngay</button>

          <div className="secure-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 5H3V13H13V5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 5V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Thanh toán an toàn & bảo mật
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
