import React from "react";
import Content from "./Content";
import { useLocation, useNavigate } from "react-router-dom";

function EmployeeDetailPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/employee');
  };
  const location = useLocation();
  return (
    <>
      <Content>
        Employee Detail Page
      </Content>
      <div className="flex">
      <div
            onClick={handleBack}
            className="rounded-full border-2 border-gray-400 px-6 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2"
          >
            Back
          </div></div>
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
                {location.state?.employee.working_status ==='active' ? <div className="text-green-500">Active Employee</div> : <div className="red-green-500">Inactive Employee</div>}
              </div>
            </div>
            <hr/>
            <div className="flex-col p-4 text-xl">
            <div>
              Father's Name : {location.state?.employee.fathers_name}
            </div>
            <div>
              Mother's Name : {location.state?.employee.mothers_name}
            </div>
            <div>
              Address : {location.state?.employee.address}
            </div>
            <div>
              Date of Joining: {location.state?.employee.dateofjoining && new Date(location.state.employee.dateofjoining).toLocaleDateString()}
            </div>

            <div>
              Date of Birth : {location.state?.employee.dob && new Date(location.state.employee.dob).toLocaleDateString()}
            </div>
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
