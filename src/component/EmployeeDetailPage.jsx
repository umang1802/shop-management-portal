import React from "react";
import Content from "./Content";
import { useLocation } from "react-router-dom";

function EmployeeDetailPage() {
  const location = useLocation();
  return (
    <>
      <Content></Content>
      <div className="w-auto bg-white rounded-xl shadow-xl m-4">
        <div className="flex bg-white px-8 py-8 shadow-md rounded-md">
          <div className="w-full lg:w-1/3 xl:w-1/3 p-2">
            <div className="flex">
              <img
                src={`http://ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/${location.state?.employee.product}`}
                height="150"
                width="150"
                alt="Product"
              />
              <div className="flex flex-col mx-4">
                <div className="text-4xl">{location.state?.employee.name}</div>

                <div className="text-2xl">
                  {location.state?.employee.working_area}
                </div>
                <div>{location.state?.employee.mobileno}</div>
                <div className="text-green-500">Active Employee</div>
              </div>
            </div>
            <hr/>
            <div>
              <div></div>
            </div>
          </div>
          <div className="hidden lg:block xl:block w-px bg-gray-300 mx-4"></div>
          <div className="lg:block xl:block w-1/3 p-6">
            <div className="flex flex-col items-center">
              <div className="table-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetailPage;
