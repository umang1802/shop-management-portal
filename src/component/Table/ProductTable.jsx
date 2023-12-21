import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Table = ({ data, pageSize }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editItem, setEditItem] = React.useState(null);
  const [editedData, setEditedData] = React.useState({});
  const [categoryFilters, setCategoryFilters] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [productId, setProductId] = React.useState(0);
  const [outletId, setOutletId] = React.useState(0);
  const [warehouseStock, setWarehoseStock] = React.useState(0);
  const [outletStock, setOutletStock] = React.useState(0);
  const [warehouseId, setWarehouseId] = React.useState(0);

  pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    const filterData = data.filter((item) => {
      if (
        categoryFilters.length === 0 ||
        categoryFilters.some((filter) => filter.value === item.category)
      ) {
        return true;
      }
      return false;
    });

    setFilteredData(filterData);
  }, [data, categoryFilters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditedData(item);
    setProductId(item.id);
    setWarehouseId(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "stockOutlet01") {
      setOutletId(1);
      setOutletStock(Number(value));
    }
    if (name === "stockOutlet02") {
      setOutletId(2);
      setOutletStock(Number(value));
    }
    if (name === "stockWorkshop") {
      setWarehoseStock(Number(value));
    }
    setEditedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    setEditedData({});
    try {
      const response = await axios.post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/update-stock",
        { warehouseStock, outletStock, productId, outletId, warehouseId }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setEditItem(null);
  };

  const handleReset = () => {
    setEditedData(editItem);
    setEditItem(null);
  };

  const handleMakeInactive = async () => {
    try {
      const response = await axios.post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/product/makeInactive",
        { productId }
      );
      if (response) {
        alert("Product Set to Inactive");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleStarMark = async (productId) => {
    try {
      const response = await axios.post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/product/starMark",
        { productId }
      );
      if (response) {
        alert("Product Star Mark Updated");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <>
      <div className="text-2xl text-gray-800 mt-4">
        Active Product List ({data.length})
      </div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock (Workshop)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock (Sisendi Bazaar)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock (Sisendi ByPass)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <input type='checkbox' onClick={()=>handleStarMark(item.id)}/>
                        </td>
                      <Link to={`/pdp/${item.id}`} state={{ product: item }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.product_name}
                        </td>
                      </Link>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.category.category_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editItem === item ? (
                          <input
                            type="number"
                            name="stockWorkshop"
                            value={editedData.stockWorkshop || ""}
                            onChange={handleInputChange}
                            className="px-2 py-1 border border-gray-300 rounded-sm w-32"
                          />
                        ) : (
                          item.warehouse_stock[0] &&
                          item.warehouse_stock[0].quantity &&
                          item.warehouse_stock[0].quantity
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editItem === item ? (
                          <input
                            type="number"
                            name="stockOutlet01"
                            value={editedData.stockOutlet01 || ""}
                            onChange={handleInputChange}
                            className="py-1 border border-gray-300 rounded-sm w-32"
                          />
                        ) : (
                          item.outlet_stock[0] &&
                          item.outlet_stock[0].quantity &&
                          (item.outlet_stock[0].outlet_id === 1
                            ? item.outlet_stock[0].quantity
                            : item.outlet_stock[1].quantity)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editItem === item ? (
                          <input
                            type="number"
                            name="stockOutlet02"
                            value={editedData.stockOutlet02 || ""}
                            onChange={handleInputChange}
                            className="py-1 border border-gray-300 rounded-sm w-32"
                          />
                        ) : (
                          item.outlet_stock[1] &&
                          item.outlet_stock[1].quantity &&
                          (item.outlet_stock[1].outlet_id === 2
                            ? item.outlet_stock[1].quantity
                            : item.outlet_stock[0].quantity)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editItem === item ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="px-2 py-1 bg-indigo-500 text-white rounded-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleReset}
                              className="px-2 py-1 bg-gray-500 text-white rounded-sm"
                            >
                              Reset
                            </button>
                            <button
                              onClick={handleMakeInactive}
                              className="px-2 py-1 bg-red-500 text-white rounded-sm"
                            >
                              Make Inactive
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 px-8">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === index + 1
                      ? "text-indigo-500 bg-indigo-100"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
