import React from "react";
import Content from "./Content";
import { useLocation } from "react-router-dom";

function ProductDetailPage() {
  const location = useLocation();
  return (
    <>
      <Content></Content>
      <div className="w-auto bg-white rounded-xl shadow-xl m-4">
        <div className="flex bg-white px-8 py-8 shadow-md rounded-md">
          <div className="w-full lg:w-2/3 xl:w-2/3 p-6">
            
            <div className="flex">
            <img src={`http://ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/${location.state?.product.image_url}`} height="150" width="150" alt="Product" />
              <div className="flex flex-col mx-4">
              <div className="text-4xl">
                {location.state?.product.product_name}
              </div>
              
              <div className="text-2xl">
                {location.state?.product.category.category_name}
              </div>
              <div>Unit - {location.state?.product.unit}</div>
              <div>
                Minimum Stock Alert - {location.state?.product.min_stock}
                {location.state?.product.unit}
              </div>
              <div className="text-green-500">
                Price - {location.state?.product.price}/
                {location.state?.product.unit}
              </div>
              </div>
              </div>
              <table className="w-full border-collapse border border-opacity-70 mt-4">
                <thead>
                  <tr>
                    <th className="border p-2">Stock (Workshop)</th>
                    <th className="border p-2">Stock (Outlet 1)</th>
                    <th className="border p-2">Stock (Outlet 2)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      {location.state?.product.warehouse_stock[0].quantity}{" "}
                      {location.state?.product.unit}
                    </td>
                    <td className="border p-2">
                      {location.state?.product.outlet_stock[0].quantity}{" "}
                      {location.state?.product.unit}
                    </td>
                    <td className="border p-2">
                      {location.state?.product.outlet_stock[1].quantity}{" "}
                      {location.state?.product.unit}
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div className="hidden lg:block xl:block w-px bg-gray-300 mx-4"></div>
          <div className="lg:block xl:block w-1/3 p-6">
            <div className="flex flex-col items-center">
              <div className="text-center mb-4">Making Quantity - 1 Kg</div>
              <div className="table-container">
                <table className="border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border p-2">Raw Material</th>
                      <th className="border p-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Row 1, Cell 1</td>
                      <td className="border p-2">Row 1, Cell 2</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Row 2, Cell 1</td>
                      <td className="border p-2">Row 2, Cell 2</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Row 3, Cell 1</td>
                      <td className="border p-2">Row 3, Cell 2</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Row 4, Cell 1</td>
                      <td className="border p-2">Row 4, Cell 2</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Row 5, Cell 1</td>
                      <td className="border p-2">Row 5, Cell 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
