import React, { useEffect, useState } from "react";
import Content from "../component/Content";
import axios from "axios";
import DashboardCard from "../component/Card/DashboardCard";
import TaskRequestCard from "../component/Card/TaskRequestCard";

export default function Home() {
  const [dbData, setdbData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL + 'api/order/get-orders-total'
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
        <DashboardCard heading="Total Regular Order " data={dbData.total_amount_normal_orders}/>
      </div>
      <div className="flex mt-8">
        <TaskRequestCard 
        heading="Place Product Request"/>
      </div>
    </div>
  );
}
