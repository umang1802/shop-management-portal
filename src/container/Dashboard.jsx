import React, {useState, useEffect} from 'react'
import ProductTable from "../component/Table/ProductTable";
import AddCategory from '../component/AddCategory';
import AddProduct from '../component/AddProduct';
import Content from '../component/Content';
import axios from 'axios';


const pageSize = 5;

export default function Dashboard() {
    const [dbData, setdbData] = useState([]);
    const [showProductTable, setShowProductTable] = useState(true);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

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

    const backToShowProduct = () => {
        setShowProductTable(true);
        setShowAddProduct(false);
        setShowAddCategory(false);
    }
    return (
        <div>
            <div className="mt-10">
                <Content showAddCategory={showAddCategory} showAddProduct={showAddProduct} backToShowProduct={backToShowProduct} initiateAddNewCategory={initiateAddNewCategory} initiateAddNewProduct={initiateAddNewProduct} />
                {showProductTable && <ProductTable data={dbData} pageSize={pageSize} />}
                {showAddProduct && <AddProduct />}
                {showAddCategory && <AddCategory />}
            </div>
        </div>
    )
}
