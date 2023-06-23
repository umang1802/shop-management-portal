import React, {useState, useEffect} from 'react'
import ProductTable from "../component/Table/ProductTable";
import AddCategory from '../component/AddCategory';
import AddProduct from '../component/AddProduct';
import Content from '../component/Content';
import axios from 'axios';
import InactiveProductTable from '../component/Table/InactiveProductTable'


const pageSize = 5;

export default function Dashboard() {
    const [dbData, setdbData] = useState([]);
    const [showProductTable, setShowProductTable] = useState(true);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showInactiveProduct, setShowInactiveProduct] = useState(false);
    const [heading, setHeading] = useState('Stocks/Product');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://shop-service-fo3n.onrender.com/products");
                setdbData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [showInactiveProduct]);

    const initiateAddNewProduct = () => {
        setShowProductTable(false);
        setShowAddCategory(false);
        setShowAddProduct(true);
        setShowInactiveProduct(false);
        setHeading('Add New Product');
    }

    const initiateAddNewCategory = () => {
        setShowProductTable(false);
        setShowAddCategory(true);
        setShowAddProduct(false);
        setShowInactiveProduct(false);
        setHeading('Add New Category');
    }

    const backToShowProduct = () => {
        setShowProductTable(true);
        setShowAddProduct(false);
        setShowAddCategory(false);
        setShowInactiveProduct(false);
        setHeading('Stocks/Product');
    }

    const initiateShowInactiveProduct = () =>{
        setShowInactiveProduct(true);
        setShowProductTable(false);
        setShowAddCategory(false);
        setShowAddProduct(false);
        setHeading('Inactive Products');
    }

    return (
        <div>
            <div className="mt-4">
                <Content heading={heading} button1Text="Add New Product"  button2Text="Add New Category" button3Text="View Inacitve Products" showInactiveProduct={showInactiveProduct} showAddCategory={showAddCategory} showAddProduct={showAddProduct} backToShowProduct={backToShowProduct} initiateAddNewCategory={initiateAddNewCategory} initiateAddNewProduct={initiateAddNewProduct}  initiateShowInactiveProduct={initiateShowInactiveProduct}/>
                {showProductTable && <ProductTable data={dbData} pageSize={pageSize} />}
                {showAddProduct && <AddProduct />}
                {showAddCategory && <AddCategory />}
                {showInactiveProduct && <InactiveProductTable /> }
            </div>
        </div>
    )
}
