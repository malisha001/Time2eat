import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import components
import InventoryItemsDetails from "../components/inventoryItemsDetails"


const Home = () => {

    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await fetch('/api/inventory/')
            const json = await response.json()

            if(response.ok){
                    setItems(json)
            }

        }
        // call the function
        fetchInventoryItems() 
    }, [])




    return(
        <div className="home">
            <div className="items">
                { items && items.map((item) => (
                    <InventoryItemsDetails key={items._id} item={item} />
                ))}
            </div>
            <Link to ={"/inventory/addItems/"}>Add Items</Link><br />
            <Link to={"/inventory/usage/"}>Usage Form</Link>
        </div>
    )
}

export default Home;