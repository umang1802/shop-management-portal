import React, { useEffect, useState } from "react";
import Content from "../component/Content";
import DashboardCard from "../component/Card/DashboardCard";
import axios from "axios";

export default function TaskRequest() {
  const [taskRequestData, setTaskRequestData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL +
            "api/request/getRequestTask",
          { id }
        );
        if (response && response.data && response.data.rows) {
          setTaskRequestData(response.data.rows);
          console.log(response.data.rows, id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Content>Task Request Page</Content>
      <div className="flex flex-col">
        <div className="font-semibold text-2xl">To Make</div>
        <div className="flex">
          {taskRequestData
            .filter((task) => task.type === "make")
            .map((task) => {
              return (
                <DashboardCard
                  key={task.requestid}
                  image={task.image_url}
                  data={
                    task.product_name + " " + task.quantity + " " + task.unit
                  }
                  isButtonPresent={true}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="font-semibold text-2xl">To Deliver</div>
        <div className="flex">
          {taskRequestData
            .filter((task) => task.type === "deliver")
            .map((task) => {
              return (
                <DashboardCard
                  key={task.requestid}
                  data={
                    task.product_name + " " + task.quantity + " " + task.unit
                  }
                  isButtonPresent={true}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
