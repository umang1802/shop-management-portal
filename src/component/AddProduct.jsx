import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "1",
    unit: "Kg",
    price: "",
  });

  const [count, setCount] = useState(0);

  const [product_id, setProductId] = useState(1);

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
          "https://shop-service-fo3n.onrender.com/api/category/get"
        );
        setCategories(response.data.rows);
        const rwResponse = await axios.get(
          "https://shop-service-fo3n.onrender.com/api/rawMaterial"
        );
        setRMaterials(rwResponse.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      setCount(count + 1);
      return updatedRawMaterial;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    const response = await axios.post(
      "https://shop-service-fo3n.onrender.com/add-products",
      {
        ...product,
      }
    );
    console.log("New product added:", response.data);
    // Reset the form fields
    setProduct({
      product_name: "",
      category_id: "",
      unit: "",
      price: "",
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
            <div className="text-blue-600 text-base">Price</div>
            <div className="w-full mt-2">
              <input
                name="price"
                value={product.price}
                placeholder="Please enter price"
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
        <div className="lg:block xl:block w-1/2 p-6">
          <div className="flex flex-col items-start w-full">
            <div className="text-blue-600 text-base">Making Quantity</div>
            <div className="w-full mt-2">
              <input
                id="quantity"
                name="product_name"
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
                name=""
                value={rawMaterial.raw_material_id}
                placeholder="Please select category"
                className="py-2 px-2 border border-blue-600 text-blue-600 rounded-sm w-full"
                onChange={handleRawMaterialChange}
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
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
