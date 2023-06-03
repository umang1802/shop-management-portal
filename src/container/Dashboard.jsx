import React, {useState, useEffect} from 'react'
import ProductTable from "../component/Table/ProductTable";
import AddCategory from '../component/AddCategory';
import AddProduct from '../component/AddProduct';
import Content from '../component/Content';


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

export default function Dashboard() {
    const [dbData, setdbData] = useState([]);
    const [showProductTable, setShowProductTable] = useState(true);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get("http://localhost:3002/products");
                setdbData(result);
                console.log(result);
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
        <div>
            <div className="mt-10">
                <Content initiateAddNewCategory={initiateAddNewCategory} initiateAddNewProduct={initiateAddNewProduct} />
                {showProductTable && <ProductTable data={dbData} pageSize={pageSize} />}
                {showAddProduct && <AddProduct />}
                {showAddCategory && <AddCategory />}
            </div>
        </div>
    )
}
