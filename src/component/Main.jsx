import React from "react";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import ProductTable from "./Table/ProductTable";
import SideBar from "./SideBar";
import Content from "./Content";
import axios from "axios";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    productName: "Product A",
    category: "Category 1",
    stockWorkshop: 10,
    stockOutlet01: 5,
    stockOutlet02: 8,
  },
  // Add more data objects here
];



// Number of items per page
const pageSize = 5;

const result = [
  {
    "id": 1,
    "product_name": "Laddu",
    "category": {
      "category_id": 1,
      "category_name": "Desi Ghee"
    },
    "warehouse_stock": [
      {
        "warehouse_id": 1,
        "quantity": 230
      },
      {
        "warehouse_id": 1,
        "quantity": 230
      }
    ],
    "outlet_stock": [
      {
        "outlet_id": 2,
        "quantity": 80
      },
      {
        "outlet_id": 1,
        "quantity": 120
      }
    ]
  },
  {
    "id": 2,
    "product_name": "New Product",
    "category": {
      "category_id": 1,
      "category_name": "Desi Ghee"
    },
    "warehouse_stock": [
      {
        "warehouse_id": 1,
        "quantity": 120
      },
      {
        "warehouse_id": 1,
        "quantity": 120
      }
    ],
    "outlet_stock": [
      {
        "outlet_id": 2,
        "quantity": 56
      },
      {
        "outlet_id": 1,
        "quantity": 12
      }
    ]
  }
]

function Main(props) {

  const [dbData, setdbData] = useState([]);
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/products");
        setdbData(response.data);
        console.log('resp---->', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const initiateAddNewProduct = () => {
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(true);
    console.log('initiated1')
  }

  const initiateAddNewCategory = () => {
    setShowProductTable(false);
    setShowAddCategory(true);
    setShowAddProduct(false);
    console.log('initiated2')
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-4/5 px-4 py-4">
          <Content initiateAddNewCategory={initiateAddNewCategory} initiateAddNewProduct={initiateAddNewProduct} />
          <div className="mt-10">
            {showProductTable && <ProductTable data={dbData} pageSize={pageSize} />}
            {showAddProduct && <AddProduct />}
            {showAddCategory && <AddCategory />}
          </div>

        </div>
        {/* <AddCategory/> */}

      </div>

      {/* <div class="grid grid-col-12 grid-flow-col gap-2">
        <div class="col-span-2 border border-black-800">
         <div className='font-semibold text-center text-4xl'>Ram Shiv</div>
         <div className="mt-16">
            <div className="m-4 border border-black-800">Dashboard</div>
            <div className="m-4 border border-black-800">Stock and Products</div>
         </div>
        </div>
        <div class="col-span-10 border border-black-800">
            <Header heading="Stocks/Products"/>
            <Content/>
        </div>
      </div> */}
    </>
  );
}

export default Main;
