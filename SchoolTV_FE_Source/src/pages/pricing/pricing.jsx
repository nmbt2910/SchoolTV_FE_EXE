import "./pricing.css";

const PricingPage = () => {
  const plans = [
    {
      title: "Cơ Bản",
      price: "199K",
      color: "#00ff9d",
      features: [
        "Tối đa 500 học sinh",
        "5 stream đồng thời",
        "Lưu trữ 30 ngày",
        "Hỗ trợ cơ bản",
      ],
    },
    {
      title: "Chuyên Nghiệp",
      price: "499K",
      color: "#7bed9f",
      popular: true,
      features: [
        "Không giới hạn học sinh",
        "20 stream đồng thời",
        "Lưu trữ 90 ngày",
        "Hỗ trợ 24/7",
        "Tích hợp LMS",
      ],
    },
    {
      title: "Doanh Nghiệp",
      price: "Liên hệ",
      color: "#a29bfe",
      features: [
        "Giải pháp tùy chỉnh",
        "API tích hợp",
        "SLA cam kết",
        "Quản lý tài khoản riêng",
        "Bảo mật nâng cao",
      ],
    },
  ];

  return (
    <>
      <div className="pricing-header">
        <h1>Lựa Chọn Gói Dịch Vụ Phù Hợp</h1>
        <p>
          Giải pháp streaming và học trực tuyến toàn diện cho mọi quy mô trường
          học
        </p>
      </div>

      <div className="pricing-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && <div className="popular-tag">Phổ biến</div>}
            <h3>{plan.title}</h3>
            <div className="price">
              {plan.price}
              <span className="price-span">/tháng</span>
            </div>
            <div className="features">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="feature">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className="try-button">
              {plan.price === "Liên hệ"
                ? "Liên Hệ Tư Vấn"
                : "Dùng Thử Miễn Phí"}
            </button>
            <button className="secondary-button">Tìm hiểu thêm</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingPage;
