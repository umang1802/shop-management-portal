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
    productImage: null,
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
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/category/get'
        );
        setCategories(response.data.rows);
        const rwResponse = await axios.get(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/rawMaterial'
        );
        setRMaterials(rwResponse.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: name === 'productImage' ? files[0] : value,
    });
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('product_name', product.product_name);
      formDataToSend.append('category_id', product.category_id);
      formDataToSend.append('min_stock', product.min_stock);
      formDataToSend.append('unit', product.unit);
      formDataToSend.append('price', product.price);
      formDataToSend.append('productImage', product.productImage);

    
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'add-products',
      formDataToSend
    );
    if(response){
    alert("New product added");
    // Reset the form fields
    setProduct({
      product_name: "",
      category_id: "",
      min_stock: "",
      unit: "",
      price: "",
      productImage: null,
      rawMaterial: rawMaterial, 
    });}
  } catch (error) {
    console.error(error);
    alert('Error saving product data.');
  }
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
            <div className="text-blue-600 text-base">Product Photo</div>
            <div className="w-full mt-2">
            <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            required
          />
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
