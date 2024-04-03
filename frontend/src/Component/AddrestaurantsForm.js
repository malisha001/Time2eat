import { useState} from "react"
import { useNavigate } from "react-router-dom"

const AddrestaurantsForm = () =>{
    
   const navigate = useNavigate();
    const [Restaurant_Id, setRestaurant_id] =useState('')
    const [Restaurant_licensenumber, setRestaurant_licensenumber] =useState('')
    const [Restaurant_name, setRestaurant_name] =useState('')
    const [Restaurant_Managersname, setRestaurant_Managersname] =useState('')
    const [Email_address, setEmail_address] =useState('')
    const [contact, setcontact] =useState('')
    const [Password, setPassword] =useState('')
    const [Confirm_paasword, setConfirm_paasword] =useState('')
    const [Address, setAddress] =useState('');
    const [Couple_table, setCouple_table] =useState('')
    const [Group_table, setGroup_table] =useState('')
    const [error,setError] = useState(null)

   const handleSubmit = async (e) => {
     e.preventDefault()
      
     const restaurant = {Restaurant_Id,Restaurant_licensenumber,Restaurant_name,Restaurant_Managersname,Email_address,contact,Password,Confirm_paasword,Address,Couple_table,Group_table}
    console.log(Restaurant_Id)
     const response = await fetch('/api/restaurants', {
        method : 'POST',
        body: JSON.stringify(restaurant),
        headers :{
            'content-Type': 'application/json'

        }
     })
     const json  = await response.json()
    
     if(!response.ok){
        setError(json.error)
     }
     if(response.ok){
        setRestaurant_id('')
        setRestaurant_licensenumber('')
        setRestaurant_name('')
        setRestaurant_Managersname('')
        setEmail_address('')
        setcontact('')
        setPassword('')
        setConfirm_paasword('')
        setAddress('')
        setCouple_table('')
        setGroup_table('')

        setError(null)
        console.log('New rsetaurant added',json)

        //navigate
        navigate('/restaurants');
     }

   }

    return(
     <form className="create" onSubmit={handleSubmit}>
        <h2>Add Restaurant</h2>

        <label> Restaurant Id :</label>
        <input
        type="text"
        name="Restaurant_Id"
        onChange={(e) => setRestaurant_id(e.target.value)}
        value={Restaurant_Id}
        />
        
        <label>Restaurant License Number:</label>
        <input
        type="text"
        onChange={(e) => setRestaurant_licensenumber(e.target.value)}
        value={Restaurant_licensenumber}
        />

        <label>Restaurant Name :</label>
        <input
        type="text"
        onChange={(e) => setRestaurant_name(e.target.value)}
        value={Restaurant_name}
        />

        <label>Restaurant Manager's Name   :</label>
        <input
        type="text"
        onChange={(e) => setRestaurant_Managersname(e.target.value)}
        value={Restaurant_Managersname}
        />

        <label>Email Address :</label>
        <input
        type="text"
        onChange={(e) => setEmail_address(e.target.value)}
        value={Email_address}
        /> 

        <label>Contact :</label>
        <input
        type="text"
        onChange={(e) => setcontact(e.target.value)}
        value={contact}
        /> 

        <label>Password :</label>
        <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={Password}
        /> 

        <label>Confirm Password :</label>
        <input
        type="text"
        onChange={(e) => setConfirm_paasword(e.target.value)}
        value={Confirm_paasword}
        /> 

        <label> Address :</label>
        <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={Address}
        /> 

        <label>Couple Table :</label>
        <input
        type="text"
        onChange={(e) => setCouple_table(e.target.value)}
        value={Couple_table}
        /> 

        <label>Group Table :</label>
        <input
        type="text"
        onChange={(e) => setGroup_table(e.target.value)}
        value={Group_table}
        /> 
   
      <button type="submit">Add Restaurant</button>
   
      {error && <div className="error">{error}</div>}
     </form>
    )
}
export default AddrestaurantsForm
