import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

const Table = ({ data, pageSize }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editItem, setEditItem] = React.useState(null);
  const [editedData, setEditedData] = React.useState({});
  const [sortBy, setSortBy] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [categoryFilters, setCategoryFilters] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const categories = ['Category 1', 'Category 2', 'Category 3']; // Replace with your own categories

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Save', editedData);
    setEditItem(null);
    setEditedData({});
  };

  const handleReset = () => {
    setEditedData(editItem);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleCategoryFilterChange = (selectedOptions) => {
    setCategoryFilters(selectedOptions);
  };

  const sortedData = React.useMemo(() => {
    let sorted = [...filteredData];
    if (
      sortBy === 'stockWorkshop' ||
      sortBy === 'stockOutlet01' ||
      sortBy === 'stockOutlet02'
    ) {
      sorted = sorted.sort((a, b) => {
        if (sortDirection === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    } else if (sortBy === 'category') {
      sorted = sorted.sort((a, b) => {
        if (sortDirection === 'asc') {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      });
    }
    return sorted;
  }, [filteredData, sortBy, sortDirection]);

  return (<>
    <div className="text-2xl text-gray-800 mt-4">Active Product List ({data.length})</div>
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
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                    <MultiSelect
                      options={categories.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      value={categoryFilters}
                      onChange={handleCategoryFilterChange}
                      labelledBy="Select"
                      className="mt-1"
                      hasSelectAll={false}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems: 'Select categories',
                        allItemsAreSelected: 'All categories are selected',
                      }}
                    />
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
                    Stock (Outlet 01)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock (Outlet 02)
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
                {sortedData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editItem === item ? (
                        <input
                          type="text"
                          name="productName"
                          value={editedData.productName || ''}
                          onChange={handleInputChange}
                          className="px-2 py-1 border border-gray-300 rounded-sm w-full sm:w-auto"
                        />
                      ) : (
                        item.product_name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editItem === item ? (
                        <select
                          name="category"
                          value={editedData.category || ''}
                          onChange={handleInputChange}
                          className="px-2 py-1 border border-gray-300 rounded-sm w-full sm:w-auto"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.category.category_name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editItem === item ? (
                        <input
                          type="number"
                          name="stockWorkshop"
                          value={editedData.stockWorkshop || ''}
                          onChange={handleInputChange}
                          className="px-2 py-1 border border-gray-300 rounded-sm w-full sm:w-auto"
                        />
                      ) : (
                        item.warehouse_stock[0] &&
                        item.warehouse_stock[0].quantity &&
                        item.warehouse_stock[0].quantity
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editItem === item ? (
                        <input
                          type="number"
                          name="stockOutlet01"
                          value={editedData.stockOutlet01 || ''}
                          onChange={handleInputChange}
                          className="px-2 py-1 border border-gray-300 rounded-sm w-full sm:w-auto"
                        />
                      ) : (
                        item.outlet_stock[0] &&
                        item.outlet_stock[0].quantity &&
                        item.outlet_stock[0].quantity
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editItem === item ? (
                        <input
                          type="number"
                          name="stockOutlet02"
                          value={editedData.stockOutlet02 || ''}
                          onChange={handleInputChange}
                          className="px-2 py-1 border border-gray-300 rounded-sm w-full sm:w-auto"
                        />
                      ) : (
                        item.outlet_stock[1] &&
                        item.outlet_stock[1].quantity &&
                        item.outlet_stock[1].quantity
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
        <div className="flex justify-between items-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <div className="flex justify-end mt-4">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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
                        ? 'text-indigo-500 bg-indigo-100'
                        : 'text-gray-700 hover:bg-gray-50'
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
          </nav>
        </div>
      </div>
    </div></>
  );
};

export default Table;
