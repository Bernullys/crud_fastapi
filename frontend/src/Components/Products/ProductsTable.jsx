import { useEffect, useState } from "react"
import Header from "../Header/Header"
import TableCard from "../TableCard/TableCard"
import { fetchProducts } from "../../api/products"
import { productsBaseUrl } from "../../config"


function ProductsTable () {

    const [selectedAction, setSelectedAction] = useState(null)

    const [data, setData] = useState(null)

    function handleTableAction (action) {
        setSelectedAction(action)
    }

    async function loadProducts () {
        const response = await fetchProducts(productsBaseUrl)
        setData(response || [])
    }

    useEffect(() => {loadProducts()},[])


    const products = data?.data? data.data.map(p => ({
        id: p.id,
        price: p.price,
        stock: p.stock,
        category: p.category
    })) : [];



    const productsHeaders = ["Id", "Price", "Stock", "Category"]

    return (
        <div>
            <h2>Products Table</h2>
            <Header selectedTable={"products"} onAction={handleTableAction}/>
            {
                selectedAction === "search" && ( <div>Search</div>)
            }
            {
                selectedAction === "add" && (<div>Add</div>)
            }
            {
                selectedAction === "update" && (<div>Update</div>)
            }
            {
                selectedAction === "delete" && (<div>Delete</div>)
            }
            <TableCard headers={productsHeaders} data={products}/>
        </div>
    )
}

export default ProductsTable