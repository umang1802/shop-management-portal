import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ data, pageSize }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [categoryFilters, setCategoryFilters] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

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
  
  return (
    <>
      <div className="text-2xl text-gray-800 mt-4">
        Active Employee List ({data.length})
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
                      Employee Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Working Area
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attendance Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time In
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time Out
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      View Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item) => (
                    <tr key={item.id}>
                     
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.working_area}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                       {item.mobileno}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        Present
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        00:00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        00:00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link to={`/employee/${item.employee_id}`} state={{ employee: item }}> <button>View Profile</button></Link>
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

export default EmployeeTable;
