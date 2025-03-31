import React from "react";
import "./PaymentHistoryPage.scss";
import { Flex } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PaymentDataHandle from "../../components/so-payment-history/PaymentDataHandle";
import PaymentDataStatistic from "../../components/so-payment-history/PaymentDataStatistic";
import PaymentDataTable from "../../components/so-payment-history/PaymentDataTable";

function PaymentHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="so-payment-history-container">
      <Flex justify="space-between" align="center">
        <h1>Lịch sử giao dịch</h1>
        <Flex
          align="center"
          onClick={() => navigate("/userProfile")}
          style={{ cursor: "pointer" }}
        >
          <IoIosArrowBack style={{ marginRight: 5 }} />
          <p>Trang hồ sơ</p>
        </Flex>
      </Flex>

      <PaymentDataHandle />
      <PaymentDataStatistic />
      <PaymentDataTable />
    </div>
  );
}

export default PaymentHistoryPage;
