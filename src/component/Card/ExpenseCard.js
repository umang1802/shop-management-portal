import React from "react";

function ExpenseCard(props) {
    let sum = 0;
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
        {props.data && props.data.map((item)=>{
            return (
                <tr>
                <td className="px-4 py-2 text-center">{item.description}</td>
                <td className="px-4 py-2 text-center">{item.amount}</td>
                {/* {sum= sum+item.amount} */}
              </tr>
            )
        })}
       {/* {sum}     */}
      </tbody>
    </table>
    </div>
  );
}

export default ExpenseCard;
