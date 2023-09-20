import React, { useEffect, useState } from "react";
import Content from "../component/Content";
import axios from "axios";
import DashboardCard from "../component/Card/DashboardCard";

export default function Home() {
  const [dbData, setdbData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/order/get-orders-total"
        );
        setdbData(response.data.rows[0]);
        console.log(response.data.rows[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Content>Super Admin</Content>
      <div className="flex">
      <DashboardCard heading="Total Sale" data={dbData.total_amount_all_orders}/>
      <DashboardCard heading="Total Special Order" data={dbData.total_amount_special_orders}/>
      <DashboardCard heading="Total Regular Order " data={dbData.total_amount_normal_orders}/></div>
    </div>
  );
}
