import axios from "axios";
import React, { useState } from "react";

function AddRawMaterialCard(props) {
  const [raw_material_name, setName] = useState("");
  const [unit, setUnit] = useState('Kg');

  const handleRawNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleAddRawMaterial = (e) => {
    e.preventDefault();
    axios
      .post("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/rawMaterial/add", {
        raw_material_name,
        unit,
      })
      .then((resp) => {
        alert('Raw Material Added Sucessfully')
        setName('');
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };
  return (
    <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg m-4">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Add Raw Material</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">
              <div className="text-blue-600">Raw Material Name</div>
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2 ml-4"
                type="text"
                value={raw_material_name}
                placeholder="Enter Raw Material Name"
                onChange={handleRawNameChange}
                defaultValue="Kg"
              />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              <div className="text-blue-600">Unit</div>
              <select
                name="unit"
                placeholder="Please select unit"
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2 ml-4"
                onChange={handleUnitChange}
                value={unit}
              >
                <option value={"Kg"}>Kg</option>
                <option value={"litre"}>Litre</option>
                <option value={"Piece"}>Piece</option>
              </select>
            </td>
          </tr>
          <tr className="text-center">
            <button
              className="rounded-full border-2 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-4"
              type="submit"
              onClick={handleAddRawMaterial}
            >
              Save
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddRawMaterialCard;
