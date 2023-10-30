import React, { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    aadhar: "",
    mobileno: "",
    address: "",
    salary: 0,
    dateofjoining: "",
    working_area: "",
    dob: "",
    fathers_name: "",
    mothers_name: "",
    photo: null,
  });
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee({
      ...employee,
      [name]: name === 'photo' ? files[0] : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', employee.name);
      formDataToSend.append('aadhar', employee.aadhar);
      formDataToSend.append('mobileno', employee.mobileno);
      formDataToSend.append('address', employee.address);
      formDataToSend.append('salary', employee.salary);
      formDataToSend.append('dateofjoining', employee.dateofjoining);
      formDataToSend.append('working_area', employee.working_area);
      formDataToSend.append('dob', employee.dob);
      formDataToSend.append('fathers_name', employee.fathers_name);
      formDataToSend.append('mothers_name', employee.mothers_name);
      formDataToSend.append('photo', employee.photo);

    
    const response = await axios.post(
      "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/employee/add",
      formDataToSend
    );
    if(response){
    alert("New employee added");
    // Reset the form fields
    setEmployee({
      name: "",
      aadhar: "",
      mobileno: "",
      address: "",
      salary: 0,
      dateofjoining: "",
      working_area: "",
      dob: "",
      fathers_name: "",
      mothers_name: "",
      photo: null,
    });}
  } catch (error) {
    console.error(error);
    alert('Error saving product data.');
  }
  };

  return (
    <div>
      <div className="flex bg-white px-8 py-8 shadow-md rounded-md">
        <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
          <div className="flex flex-col items-start w-full">
            <div className="text-blue-600 text-base">Employee Name</div>
            <div className="w-full mt-2">
              <input
                id="name"
                name="name"
                value={employee.name}
                placeholder="Please enter Employee name"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Aadhar Number</div>
            <div className="w-full mt-2">
            <input
                id="aadhar"
                name="aadhar"
                value={employee.aadhar}
                placeholder="Please enter Aadhar Number"
                type="number"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Mobile Number</div>
            <div className="w-full mt-2">
            <input
                id="mobileno"
                name="mobileno"
                value={employee.mobileno}
                placeholder="Please enter Mobile Number"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Address</div>
            <div className="w-full mt-2">
              <input
                name="address"
                value={employee.address}
                placeholder="Please enter Address"
                type="text"
                className="text-blue-600 py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              >
              </input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Salary</div>
            <div className="w-full mt-2">
              <input
                name="salary"
                value={employee.salary}
                placeholder="Please enter Salary"
                type="number"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Employee Photo</div>
            <div className="w-full mt-2">
            <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            required
          />
            </div>
          </div>
          
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/3 p-4">
        <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Date of Joining</div>
            <div className="w-full mt-2">
              <input
                name="dateofjoining"
                value={employee.dateofjoining}
                placeholder="Please enter Date of Joining"
                type="date"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Working Area</div>
            <div className="w-full mt-2">
              <input
                name="working_area"
                value={employee.working_area}
                placeholder="Please enter Working Area"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Date of Birth</div>
            <div className="w-full mt-2">
              <input
                name="dob"
                value={employee.dob}
                placeholder="Please enter Date of Birth"
                type="date"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Father's Name</div>
            <div className="w-full mt-2">
              <input
                name="fathers_name"
                value={employee.fathers_name}
                placeholder="Please enter Father's Name"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <div className="text-blue-600 text-base">Mother's Name</div>
            <div className="w-full mt-2">
              <input
                name="mothers_name"
                value={employee.mothers_name}
                placeholder="Please enter Mother's Name"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-full border-2 border-green-300 px-6 py-1 shadow-md text-sm font-semibold text-green-600 m-2 mt-6"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddEmployee;
