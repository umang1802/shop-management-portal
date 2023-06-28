import React from "react";

function ExpenseCard(props) {
  return (
    <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg m-4">
      <table className="w-full">
      <thead className="bg-blue-50 rounded-xl">
        <tr>
          <th className="px-4 py-2">{props.firstHeading}</th>
          {props.secondHeading && <th className="px-4 py-2">{props.secondHeading}</th>}
        </tr>
      </thead>
      <tbody>
            <tr>
              <td className="px-4 py-2 text-center">SA</td>
              <td className="px-4 py-2 text-center">asfcx</td>
            </tr>
      </tbody>
    </table>
    </div>
  );
}

export default ExpenseCard;
