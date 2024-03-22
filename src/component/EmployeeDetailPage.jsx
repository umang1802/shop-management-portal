import React from "react";
import Content from "./Content";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    navigate("/employee");
  };

  const handleChangeStatus = () => {
    let employee_id =location.state?.employee.employee_id;
    let working_status = location.state?.employee.working_status === "active" ? 'inactive':'active';
    axios.put(process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/employee/updateWorkingStatus', 
    { employee_id, working_status }).then(()=>{
      alert('Employee Marked '+ (location.state?.employee.working_status === "active" ? 'Inactive':'Active'));
    })
  }
 
  return (
    <>
      <Content>Employee Detail Page</Content>
      <div className="flex">
        <div
          onClick={handleBack}
          className="rounded-full border-2 border-gray-400 px-6 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2"
        >
          Back
        </div>
        <div
          onClick={handleChangeStatus}
          className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
        >
         {location.state?.employee.working_status === "active" ? 'Make Inactive': 'Make Active'}
        </div>
        <div
          className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
        >
          Edit Profile
        </div>
      </div>
      <div className="w-auto bg-white rounded-xl shadow-xl m-4 capitalize">
        <div className="flex bg-white px-8 py-8 shadow-md rounded-md">
          <div className="w-full lg:w-1/3 xl:w-1/3 p-2">
            <div className="flex">
              <img
                src={`${process.env.REACT_APP_BACKEND_MICROSERVICE_URL}+${location.state?.employee.product}`}
                height="100"
                width="100"
                alt="Employee"
              />
              <div className="flex flex-col mx-4">
                <div className="text-4xl">{location.state?.employee.name}</div>

                <div className="text-xl">
                  {location.state?.employee.working_area}
                </div>
                <div>+91-{location.state?.employee.mobileno}</div>
                {location.state?.employee.working_status === "active" ? (
                  <div className="text-green-500">Active Employee</div>
                ) : (
                  <div className="text-red-500">Inactive Employee</div>
                )}
              </div>
            </div>
            <hr className="mt-4" />
            <div className="flex-col text-lg">
            <div className="font-semibold mt-2 text-xl">Employee Details</div>
                <div className="px-2 py-4">
                    <div>Father's Name - {location.state?.employee.fathers_name}</div>
                    <div>Mother's Name - {location.state?.employee.mothers_name}</div>
                    <div>Address - {location.state?.employee.address}</div>
                    <div>
                      Date of Joining - {location.state?.employee.dateofjoining &&
                        new Date(
                          location.state.employee.dateofjoining
                        ).toLocaleDateString()}
                    </div>

                    <div>
                      Date of Birth - {location.state?.employee.dob &&
                        new Date(location.state.employee.dob).toLocaleDateString()}
                    </div>
                </div>
            </div>
            <hr className="mt-4" />
            <div className="flex-col text-md">
            <div className="font-semibold mt-2 text-xl">Bank Details</div>
                <div className="px-2 py-4">
                    <div>Bank Name - {location.state?.employee.bank_name}</div>
                    <div>
                      Account Number - {location.state?.employee.account_number}
                    </div>
                    <div>IFSC Code - {location.state?.employee.ifsc_number}</div>
                    <div>
                      Account Holder Name - {location.state?.employee.account_holder_name}
                    </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block xl:block w-px bg-gray-300 mx-4"></div>
          <div className="lg:block xl:block p-6">
            <div className="flex flex-col items-center text-2xl">
              Attendance Area under progress
              <div className="table-container"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetailPage;
