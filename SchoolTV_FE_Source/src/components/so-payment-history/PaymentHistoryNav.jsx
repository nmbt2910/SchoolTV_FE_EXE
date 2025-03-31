import React from "react";
import "./PaymentHistoryNav.scss";
import { GrMoney } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function PaymentHistoryNav() {
  const navigate = useNavigate();
  return (
    <div className="user-profile-info-card payment-history-nav">
      <h2>Lịch sử giao dịch </h2>
      <div className="user-profile-account-item">
        <div className="payment-history-nav-icon">
          <GrMoney />
        </div>
        <div className="user-profile-account-info">
          <span>Tổng số giao dịch</span>
          <p>30+ gói thanh toán</p>
        </div>

        <div
          className="payHis-detail-btn"
          onClick={() => navigate("/so-payment-history")}
        >
          Xem chi tiết
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryNav;
