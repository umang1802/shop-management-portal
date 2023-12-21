import React from "react";

function ModalCard(props) {
  function limit(string = "", limit = 0) {
    return string.substring(0, limit);
  }

  return (
      <div className="w-full bg-white rounded-2xl shadow-2xl">
        {console.log(props)}
        <div className="flex p-4">
          <div>
            <h2 className="text-xl font-bold">
              {(props.orderData && props.orderData.customer_name) || ''} 
            </h2>
            <p className="text-sm font-bold">
              {(props.orderData && props.orderData.mobile_number)|| ''} | {" "}
              {(props.orderData && props.orderData.customer_address) || ''} 
            </p>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <label className="justify-left">Delivery Date</label>
          <label className="justify-right">Delivery Time</label>
        </div>
        <div className="flex justify-between px-4">
          <label className="justify-left">
            {(props.orderData &&  props.orderData.delivery_date && limit(props.orderData.delivery_date, 10).split('-').reverse().join('/')) || ''} 
          </label>
          <label className="justify-right mr-7">
            {" "}
            {(props.orderData && props.orderData.delivery_time) || ''} 
          </label>
        </div>
        <div className="bg-gradient-to-b from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl">
        {props.orderData && props.orderData.order_items && props.orderData.order_items.map((orderItem)=>{
          return (<div className="p-2">
          <p className="md:text-sm lg:text-lg font-semibold">{orderItem && orderItem.product_name}</p>
          <label>{orderItem && orderItem.quantity} {orderItem && orderItem.product_unit}</label>{" "}
          <label className="text-sm ml-4">{orderItem && orderItem.category_name}</label>
        </div>)
        }) }
          <div className="bg-white rounded-2xl text-black text-sm mt-8">
            <div className="flex flex-col items-center">
              <p className="text-center">Total Amount : {(props.orderData && props.orderData.total_amount) || 0} </p>
              <p className="text-center">Advance :</p>
              <p className="text-center">Discount : {(props.orderData && props.orderData.discount) || 0}</p>
              <p className="text-center">Pending Amount :</p>
            </div>
            <hr className="mt-4 mx-4" />
            <div className="flex justify-center">
              <label className="font-bold">Note</label>
            </div>
            <div className="flex justify-center">
              <label className="text-xs mb-2">
              {(props.orderData && props.orderData.note) || 'This is a regular Order'}
              </label>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ModalCard;
