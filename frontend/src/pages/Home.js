import { useEffect, useState } from "react"

// import components
import InventoryItemsDetails from "../components/inventoryItemsDetails"
import ItemForm from "../components/addItemForm"

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
            <ItemForm />
        </div>
    )
}

export default Home;