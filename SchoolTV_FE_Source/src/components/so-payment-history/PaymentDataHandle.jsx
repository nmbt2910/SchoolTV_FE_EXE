import React from "react";
import "./PaymentDataHandle.scss";
import { FaFileExport } from "react-icons/fa6";
import { Flex, Input, Select } from "antd";
const { Search } = Input;

function PaymentDataHandle() {
  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
  };

  const orderStatus = [
    { value: "active", label: "Hoạt động" },
    { value: "expired", label: "Hết hạn" },
  ];
  return (
    <div className="so-payment-history-filter">
      <Search
        placeholder="Tìm kiếm giao dịch"
        allowClear
        size="large"
        onSearch={onSearch}
        className="payHis-search-handle"
      />

      <Select
        labelInValue
        defaultValue={{ value: "all", label: "Tất cả" }}
        style={{ width: 120 }}
        options={orderStatus}
        size="large"
        className="payHis-status-select"
      />

      <Flex className="payHis-export-all-order">
        <FaFileExport />
        <p>Tải xuống toàn bộ</p>
      </Flex>
    </div>
  );
}

export default PaymentDataHandle;
