import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "9",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Category",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Stock(WareHouse)",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Stock(Outlet 1)",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Stock(Outlet 2)",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Edit Stock",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
      </Space>
    ),
  },
  {
    title: "",
    key: "",
    dataIndex: "",
    render: (_, { tags }) => (
      <>
        <Tag color={"green"}>Save</Tag>
        <Tag color={"orange"}>Reset</Tag>
      </>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
function ProductTable() {
  useEffect(() => {
    axios({
      method: "get",
      url: 'http://localhost:3002/products',
      withCredentials: false,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error getting the products ", err);
      });
  });

  return <Table columns={columns} dataSource={data} />;
}
export default ProductTable;
