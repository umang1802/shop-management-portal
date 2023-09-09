import React, { useState, useEffect } from "react";
import axios from "axios";
import RawMaterialTable from "./Table/RawMaterialTable";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "1",
    min_stock: "s",
    unit: "Kg",
    price: "",
  });

  const [count, setCount] = useState(0);

  const [rawMaterial, setRawMaterial] = useState([
    {
      quantity_required: "",
      raw_material_id: "",
    },
  ]);

  const [categories, setCategories] = useState([]);

  const [rMaterials, setRMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/category/get"
        );
        setCategories(response.data.rows);
        const rwResponse = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/rawMaterial"
        );
        setRMaterials(rwResponse.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [product]);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleRawMaterialChange = (e, index) => {
    const { name, value } = e.target;
    setRawMaterial((prevRawMaterial) => {
      const updatedRawMaterial = [...prevRawMaterial];
      updatedRawMaterial[index] = {
        ...updatedRawMaterial[index],
        [name]: value,
      };
      return updatedRawMaterial;
    });
  };
  
  const handleRawMaterialAdded = () => {
    setRawMaterial((prevRawMaterial) => [
      ...prevRawMaterial,
      {
        quantity_required: "",
        raw_material_id: "",
      },
    ]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/add-products",
      {
        ...product,
      }
    );
    alert("New product added");
    // Reset the form fields
    setProduct({
      product_name: "",
      category_id: "",
      min_stock: "",
      unit: "",
      price: "",
      rawMaterial: rawMaterial, 
    });
  };

  return (
    <div>
      <div className="flex bg-white px-8 py-8 shadow-md rounded-md">
        <div className="w-full lg:w-1/2 xl:w-1/2 p-6">
          <div className="flex flex-col items-start w-full">
            <div className="text-blue-600 text-base">Product Name</div>
            <div className="w-full mt-2">
              <input
                id="product_name"
                name="product_name"
                value={product.product_name}
                placeholder="Please enter product name"
                type="text"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Select Category</div>
            <div className="w-full mt-2">
              <select
                name="category_id"
                value={product.category_id}
                placeholder="Please select category"
                className="text-blue-600 py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Unit</div>
            <div className="w-full mt-2">
              <select
                name="unit"
                value={product.unit}
                placeholder="Please select unit"
                className="text-blue-600 py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
                defaultValue="Kg"
              >
                <option value={"Kg"}>Kg</option>
                <option value={"litre"}>Litre</option>
                <option value={"Piece"}>Piece</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Minimum Stock Alert</div>
            <div className="w-full mt-2">
              <input
                name="min_stock"
                value={product.min_stock}
                type="number"
                className="text-blue-600 py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              >
              </input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Price</div>
            <div className="w-full mt-2">
              <input
                name="price"
                value={product.price}
                placeholder="Please enter price"
                type="number"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Price</div>
            <div className="w-full mt-2">
            <input type="file" accept="image/*" onChange={handleFileChange} />
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
        <div className="lg:block xl:block w-1/2 p-6">
          <div className="flex flex-col items-start w-full">
            <div className="text-blue-600 text-base">Making Quantity</div>
            <div className="w-full mt-2">
              <input
                name="quantity_required"
                value={rawMaterial.quantity_required}
                placeholder="Please Making Quantity"
                type="number"
                className="py-2 px-2 border border-blue-600 rounded-sm w-full"
                onChange={(e) => handleRawMaterialChange(e, count)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-6">
            <div className="text-blue-600 text-base">Select Raw Material</div>
            <div className="w-full mt-2">
              <select
                name="raw_material_id"
                value={rawMaterial.raw_material_id}
                placeholder="Please select category"
                className="py-2 px-2 border border-blue-600 text-blue-600 rounded-sm w-full"
                onChange={(e) => handleRawMaterialChange(e, count)}
              >
                {rMaterials.map((item) => (
                  <option value={item.raw_material_id}>
                    {item.raw_material_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-full border-2 border-green-300 px-6 py-1 shadow-md text-sm font-semibold text-green-600 m-2 mt-6"
              onClick={handleRawMaterialAdded}
            >
              Add
            </button>
            
          </div>
          <RawMaterialTable rawMaterial={rawMaterial}/>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
