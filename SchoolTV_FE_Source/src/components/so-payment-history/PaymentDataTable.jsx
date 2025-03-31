import React from "react";
import "./PaymentDataTable.scss";
import { Table } from "antd";
import { PiDownload } from "react-icons/pi";

function PaymentDataTable() {
  const statusColors = {
    "Hoạt động": { color: "#237804", background: "#b7eb8f" },
    "Hết hạn": { color: "#a8071a", background: "#ffa39e" },
  };

  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Gói đăng ký",
      dataIndex: "package",
      key: "package",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Ngày thanh toán",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const style = statusColors[status] || {
          color: "#595959",
          background: "#f5f5f5",
        };

        return (
          <div
            className="so-payment-status"
            style={{
              background: style.background,
              color: style.color,
            }}
          >
            {status}
          </div>
        );
      },
    },

    {
      title: "Thời hạn",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <div className="so-payment-download-btn">
          <PiDownload className="so-payment-download-icon" />
          <p>Tải xuống</p>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      orderId: "#d4fg7",
      package: "Gói Người nổi tiếng",
      price: "4.500.000 vnđ",
      purchaseDate: "2025-04-01",
      status: "Hoạt động",
      duration: "1 tháng",
    },

    {
      key: "2",
      orderId: "#bf24ga",
      package: "Gói Toàn năng",
      price: "10.000.000 vnđ",
      purchaseDate: "2025-01-27",
      status: "Hết hạn",
      duration: "2 tháng",
    },

  ];
  return (
    <div className="so-paymenth-history-table">
      <Table columns={columns} dataSource={data}  />
    </div>
  );
}

export default PaymentDataTable;
