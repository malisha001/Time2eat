import { useState} from "react"
import { Link } from "react-router-dom"
const AddfooditemsForm = () =>{
  
    const [Item_id, setItem_id] =useState('')
    const [Item_name, setItem_name] =useState('')
    const [catagory, setCatagory] =useState('')
    const [Price, setPrice] =useState('')
    const [Average_preparetime, setAverage_preparetime] =useState('')
    const [error,setError] = useState(null)

   const handleSubmit = async (e) => {
     e.preventDefault()
      
     const fooditem = {Item_id,Item_name,catagory,Price,Average_preparetime}
    
     const response = await fetch('/api/fooditems', {
        method : 'POST',
        body: JSON.stringify(fooditem),
        headers :{
            'content-Type': 'application/json'

        }
     })
     const json  = await response.json()
    
     if(!response.ok){
        setError(json.error)
     }
     if(response.ok){
        setItem_id('')
        setItem_name('')
        setCatagory('')
        setPrice('')
        setAverage_preparetime('')

        setError(null)
        console.log('New fooditem added',json)
     }

   }

    return(
     <form className="create" onSubmit={handleSubmit}>
        <h2>Add Food Items</h2>

        <label>Item ID :</label>
        <input
        type="text"
        onChange={(e) => setItem_id(e.target.value)}
        value={Item_id}
        />
        
        <label>Item Name :</label>
        <input
        type="text"
        onChange={(e) => setItem_name(e.target.value)}
        value={Item_name}
        />

        <label>Catagory :</label>
        <input
        type="text"
        onChange={(e) => setCatagory(e.target.value)}
        value={catagory}
        />

        <label>Price  :</label>
        <input
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={Price}
        />

        <label>Average Prepre Time :</label>
        <input
        type="text"
        onChange={(e) => setAverage_preparetime(e.target.value)}
        value={Average_preparetime}
        /> 
      <Link to="/fooditems">
      <button>Add Food Items</button>
      </Link>
      {error && <div className="error">{error}</div>}
     </form>
    )
}
export default AddfooditemsForm
