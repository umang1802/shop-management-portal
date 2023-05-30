import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: '',
    category_id: '',
    price: '',
    image_url: '',
  });

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
    const response = await axios.post("http://localhost:3002/add-products", {
        ...product,
        });
        console.log("New product added:", response.data);
    // Reset the form fields
    setProduct({
        product_name: '',
        category_id: '',
        price: '',
        image_url: '',
    });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product_name">Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category_id">Category:</label>
          <input
            type="text"
            id="category_id"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image_url">Image:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
