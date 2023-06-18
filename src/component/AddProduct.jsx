import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "1",
    unit: "Kg",
    price: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shop-service-fo3n.onrender.com/api/category/get"
        );
        setCategories(response.data.rows);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the product data to the server or perform any other action
    console.log(product);
    const response = await axios.post("https://shop-service-fo3n.onrender.com/add-products", {
      ...product,
    });
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
                className="appearance-none py-2 px-2 border border-blue-600 rounded-sm w-full"
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
                className="appearance-none py-2 px-2 border border-blue-600 rounded-sm w-full"
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
            <div
              class=" mt-4 px-4 py-4 bg-blue-100 border border-blue-300 rounded-full w-2/5 cursor-pointer hover:bg-blue-300"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
        <div className="hidden lg:block xl:block w-1/2"></div>
      </div>
    </div>
  );
};

export default AddProduct;
