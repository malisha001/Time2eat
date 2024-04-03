import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Updaterestaurants = () => {
    const { id } = useParams(); // Get the food item id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Restaurant_Id: '',
        Restaurant_licensenumber: '',
        Restaurant_name: '',
        Restaurant_Managersname: '',
        Email_address: '',
        contact: '',
        Password: '',
        Confirm_paasword: '',
        Address: '',
        Couple_table: '',
        Group_table: '',


    });

    useEffect(() => {
        // Fetch restaurant details based on id
        const fetchrestaurant = async () => {
            try {
                const response = await fetch(`/api/restaurants/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch food item");
                }
            } catch (error) {
                console.error("Error fetching food item:", error);
            }
        };
        fetchrestaurant();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`/api/restaurants/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                navigate('/restaurants'); 
            } else {
                console.error("Failed to update restaurants");
            }
        } catch (error) {
            console.error("Error updating restaurants:", error);
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Update Restaurant Details</h3>
                <div>
                    <label>Restaurant Id :</label>
                    <input 
                        type="text"
                        value={values.Restaurant_Id}
                        onChange={e => setValues({...values, Restaurant_Id: e.target.value})}
                    />
                </div>
                <div>
                    <label>Restaurant License Number:</label>
                    <input 
                        type="text"
                        value={values.Restaurant_licensenumber}
                        onChange={e => setValues({...values, Restaurant_licensenumber: e.target.value})}
                    />
                </div>
                <div>
                    <label>Restaurant Name:</label>
                    <input 
                        type="text"
                        value={values.Restaurant_name}
                        onChange={e => setValues({...values, Restaurant_name: e.target.value})}
                    />
                </div>
                <div>
                    <label>Restaurant Manager's Name:</label>
                    <input 
                        type="text"
                        value={values.Restaurant_Managersname}
                        onChange={e => setValues({...values, Restaurant_Managersname: e.target.value})}
                    />
                </div>
                <div>
                    <label>Email Address :</label>
                    <input 
                        type="text"
                        value={values.Email_address}
                        onChange={e => setValues({...values, Email_address: e.target.value})}
                    />
                </div>
                <div>
                    <label>Contact :</label>
                    <input 
                        type="text"
                        value={values.contact}
                        onChange={e => setValues({...values, contact: e.target.value})}
                    />
                </div>
                <div>
                    <label>Password :</label>
                    <input 
                        type="text"
                        value={values.Password}
                        onChange={e => setValues({...values, Password: e.target.value})}
                    />
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <input 
                        type="text"
                        value={values.Confirm_paasword}
                        onChange={e => setValues({...values, Confirm_paasword: e.target.value})}
                    />
                </div>
                <div>
                    <label>Address :</label>
                    <input 
                        type="text"
                        value={values.Address}
                        onChange={e => setValues({...values, Address: e.target.value})}
                    />
                </div>
                 <div>
                    <label>Couple Table :</label>
                    <input 
                        type="text"
                        value={values.Couple_table}
                        onChange={e => setValues({...values, Couple_table: e.target.value})}
                    />
                </div>
                <div>
                    <label>Group Table :</label>
                    <input 
                        type="text"
                        value={values.Group_table}
                        onChange={e => setValues({...values, Group_table: e.target.value})}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Updaterestaurants;
