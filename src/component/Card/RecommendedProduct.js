import React, { useState } from "react";

function RecommendedProduct({ productData, setSelectedProduct, setSelectedProductId, onProductSelect }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleProductClick = (product) => {
    onProductSelect(product);
  };

  const filteredProducts = productData.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Recommended Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <input
                type="text"
                className="border rounded-full px-2 py-2 m-2 w-5/6"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </td>
          </tr>
          {filteredProducts.map((item) => (
            <div
              key={item.id} // Make sure to provide a unique key
              className="flex px-4 py-6 shadow-sm hover:bg-gray-200"
              onClick={() => handleProductClick(item)}
            >
              <div className="text-xl text-gray-700 font-semibold">{item.product_name}</div>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecommendedProduct;
