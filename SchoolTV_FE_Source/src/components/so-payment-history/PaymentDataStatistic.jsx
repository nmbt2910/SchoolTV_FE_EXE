import React from "react";
import "./PaymentDataStatistic.scss";
import { RiNumbersFill } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa6";
import { Statistic } from "antd";
import CountUp from "react-countup";

function PaymentDataStatistic() {
  const statisticNumberFormatter = (value) => (
    <CountUp end={value} separator="," />
  );
  return (
    <div className="so-payment-history-statistic">
      <div className="payHis-statistic-quantity">
        <RiNumbersFill className="payHis-statistic-quantity-icon" />
        <Statistic
          value={50}
          formatter={statisticNumberFormatter}
          valueStyle={{
            fontSize: "50px",
            color: "white",
            fontWeight: "bold",
          }}
          className="payHis-statistic-quantity-display"
        />
        <p className="payHis-statistic-description">
          Giao dịch của bạn gần đây
        </p>
      </div>
      <div className="payHis-statistic-seperate">
        <span className="separate-coin-icon">
          <span className="coin-text">VNĐ</span>
        </span>
        <span className="separate-coin-icon">
          <span className="coin-text">VNĐ</span>
        </span>
        <span className="separate-coin-icon">
          <span className="separate-coin-text">VNĐ</span>
        </span>
        <FaHandHolding className="payHis-money-hand" />
      </div>
      <div className="payHis-statistic-money">
        <p className="payHis-statistic-money-icon">VNĐ</p>
        <Statistic
          value={102000}
          formatter={statisticNumberFormatter}
          valueStyle={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "var(--text-color)",
          }}
          className="payHis-statistic-money-display"
        />
        <p className="payHis-statistic-description">
          Tổng số tiền đã thanh toán
        </p>
      </div>
    </div>
  );
}

export default PaymentDataStatistic;
