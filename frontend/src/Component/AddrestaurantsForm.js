import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddrestaurantsForm.css'

const AddrestaurantsForm = () => {
    const navigate = useNavigate();
    const [Restaurant_Id, setRestaurant_id] = useState('');
    const [Restaurant_licensenumber, setRestaurant_licensenumber] = useState('');
    const [Restaurant_name, setRestaurant_name] = useState('');
    const [Restaurant_Managersname, setRestaurant_Managersname] = useState('');
    const [Email_address, setEmail_address] = useState('');
    const [contact, setContact] = useState('');
    const [Password, setPassword] = useState('');
    const [Confirm_paasword, setConfirm_paasword] = useState('');
    const [Address, setAddress] = useState('');
    const [Couple_table, setCouple_table] = useState('');
    const [Group_table, setGroup_table] = useState('');
    const [status, setStatus] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const [managerNameError, setManagerNameError] = useState('');
    const [idError, setIdError] = useState('');
    const [licenseNumberError, setLicenseNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validateContact = (contact) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(contact);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateManagerName = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateID = (value) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(value);
    };

    const validateLicenseNumber = (value) => {
        const regex = /^[0-9]+$/;
        return regex.test(value);
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirm_paasword(value);
        if (value !== Password) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

    const handleManagerNameChange = (value) => {
        if (!validateManagerName(value)) {
            setManagerNameError('Restaurant manager\'s name must contain only letters.');
        } else {
            setManagerNameError('');
            setRestaurant_Managersname(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Restaurant_Id || !Restaurant_licensenumber || !Restaurant_name || !Restaurant_Managersname || !Email_address || !contact || !Password || !Confirm_paasword || !Address || !Couple_table || !Group_table) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!validateEmail(Email_address)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        if (!validateContact(contact)) {
            setContactError('Please enter a valid 10-digit contact number.');
            return;
        }

        if (!validatePassword(Password)) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }

        if (Password !== Confirm_paasword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        if (!validateID(Restaurant_Id)) {
            setIdError('Restaurant ID must contain only alphanumeric characters.');
            return;
        }

        if (!validateLicenseNumber(Restaurant_licensenumber)) {
            setLicenseNumberError('Restaurant license number must contain only numbers.');
            return;
        }

        if (!validateManagerName(Restaurant_Managersname)) {
            setManagerNameError('Restaurant manager\'s name must contain only letters.');
            return;
        }

        const restaurant = { Restaurant_Id, Restaurant_licensenumber, Restaurant_name, Restaurant_Managersname, Email_address, contact, Password, Confirm_paasword, Address, Couple_table, Group_table, status };

        try {
            const response = await fetch('/api/restaurants', {
                method: 'POST',
                body: JSON.stringify(restaurant),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setRestaurant_id('');
                setRestaurant_licensenumber('');
                setRestaurant_name('');
                setRestaurant_Managersname('');
                setEmail_address('');
                setContact('');
                setPassword('');
                setConfirm_paasword('');
                setAddress('');
                setCouple_table('');
                setGroup_table('');
                setStatus('');
                setError(null);
                console.log('New restaurant added', json);

                navigate('/restaurants');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="create res" onSubmit={handleSubmit}>
            <h2>Add Restaurant</h2>

            <label>Restaurant Id :</label>
            <input
                type="text"
                onChange={(e) => {
                    if (!validateID(e.target.value)) {
                        setIdError('Restaurant ID must contain only alphanumeric characters.');
                        return;
                    }
                    setIdError('');
                    setRestaurant_id(e.target.value);
                }}
                value={Restaurant_Id}
            />
            {idError && <div className="error">{idError}</div>}

            <label>Restaurant License Number:</label>
            <input
                type="text"
                onChange={(e) => {
                    if (!validateLicenseNumber(e.target.value)) {
                        setLicenseNumberError('Restaurant license number must contain only numbers.');
                        return;
                    }
                    setLicenseNumberError('');
                    setRestaurant_licensenumber(e.target.value);
                }}
                value={Restaurant_licensenumber}
            />
            {licenseNumberError && <div className="error">{licenseNumberError}</div>}

            <label>Restaurant Name :</label>
            <input
                type="text"
                onChange={(e) => setRestaurant_name(e.target.value)}
                value={Restaurant_name}
            />

            <label>Restaurant Manager's Name :</label>
            <input
                type="text"
                onChange={(e) => handleManagerNameChange(e.target.value)}
                value={Restaurant_Managersname}
            />
            {managerNameError && <div className="error">{managerNameError}</div>}

            <label>Email Address :</label>
            <input
                type="text"
                onChange={(e) => {
                    setEmailError('');
                    setEmail_address(e.target.value);
                }}
                value={Email_address}
            />
            {emailError && <div className="error">{emailError}</div>}

            <label>Contact :</label>
            <input
                type="text"
                onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length <= 10) {
                        setContactError('');
                        setContact(e.target.value);
                    }
                }}
                value={contact}
            />
            {contactError && <div className="error">{contactError}</div>}

            <label>Password :</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />

            <label>Confirm Password :</label>
            <input
                type="password"
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                value={Confirm_paasword}
            />
            {passwordError && <div className="error">{passwordError}</div>}

            <label>Address :</label>
            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={Address}
            />

            <label>Couple Table :</label>
            <input
                type="number"
                onChange={(e) => setCouple_table(e.target.value)}
                value={Couple_table}
            />

            <label>Group Table :</label>
            <input
                type="number"
                onChange={(e) => setGroup_table(e.target.value)}
                value={Group_table}
            />

            <button type="submit">Add Restaurant</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AddrestaurantsForm;
