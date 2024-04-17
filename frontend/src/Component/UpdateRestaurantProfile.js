import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Updaterestaurants = () => {
    const { id } = useParams(); // Get the restaurant id from URL params
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
        Group_table: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');
    

    useEffect(() => {
        // Fetch restaurant details based on id
        const fetchrestaurant = async () => {
            try {
                const response = await fetch(`/api/restaurants/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch restaurant");
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        };
        fetchrestaurant();
    }, [id]);

    const validateEmail = (email) => {
        // Basic email validation
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validateContact = (contact) => {
        // Validate if contact contains only numbers and has 10 digits
        const regex = /^[0-9]{10}$/;
        return regex.test(contact);
    };

    const validatePassword = (password) => {
        // Basic password validation
        return password.length >= 6; // Example validation, adjust as needed
    };

    const handleConfirmPasswordChange = (value) => {
        setValues({ ...values, Confirm_paasword: value });
        if (value !== values.Password) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

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
                console.error("Failed to update restaurant");
            }
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Update Restaurant Details</h3>
                
                <label>Restaurant Id :</label>
                <input 
                    type="text"
                    value={values.Restaurant_Id}
                    onChange={e => setValues({...values, Restaurant_Id: e.target.value})}
                />

                <label>Restaurant License Number:</label>
                <input 
                    type="text"
                    value={values.Restaurant_licensenumber}
                    onChange={e => setValues({...values, Restaurant_licensenumber: e.target.value})}
                />

                <label>Restaurant Name:</label>
                <input 
                    type="text"
                    value={values.Restaurant_name}
                    onChange={e => setValues({...values, Restaurant_name: e.target.value})}
                />

                <label>Restaurant Manager's Name:</label>
                <input 
                    type="text"
                    value={values.Restaurant_Managersname}
                    onChange={e => setValues({...values, Restaurant_Managersname: e.target.value})}
                />

                <label>Email Address :</label>
                <input 
                    type="text"
                    value={values.Email_address}
                    onChange={(e) => {
                        setValues({ ...values, Email_address: e.target.value });
                        if (!validateEmail(e.target.value)) {
                            setEmailError('Please enter a valid email address.');
                        } else {
                            setEmailError('');
                        }
                    }}
                />
                {emailError && <div className="error">{emailError}</div>}

                <label>Contact :</label>
                <input 
                    type="text"
                    value={values.contact}
                    onChange={(e) => {
                        setValues({ ...values, contact: e.target.value });
                        if (!validateContact(e.target.value)) {
                            setContactError('Please enter a valid 10-digit contact number.');
                        } else {
                            setContactError('');
                        }
                    }}
                />
                {contactError && <div className="error">{contactError}</div>}

                <label>Password :</label>
                <input 
                    type="password"
                    value={values.Password}
                    onChange={e => setValues({...values, Password: e.target.value})}
                />

                <label>Confirm Password :</label>
                <input 
                    type="password"
                    value={values.Confirm_paasword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                {passwordError && <div className="error">{passwordError}</div>}

                <label>Address :</label>
                <input 
                    type="text"
                    value={values.Address}
                    onChange={e => setValues({...values, Address: e.target.value})}
                />

                <label>Couple Table :</label>
                <input 
                    type="text"
                    value={values.Couple_table}
                    onChange={e => setValues({...values, Couple_table: e.target.value})}
                />

                <label>Group Table :</label>
                <input 
                    type="text"
                    value={values.Group_table}
                    onChange={e => setValues({...values, Group_table: e.target.value})}
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Updaterestaurants;
