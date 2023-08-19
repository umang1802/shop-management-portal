import React from "react";

function RawMaterialTable(props) {
  return (
    <div className="flex justify-center bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
      <div className="w-full">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Raw Material</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.rawMaterial &&
              props.rawMaterial.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-center">
                    {item.raw_material_id}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.quantity_required}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RawMaterialTable;
