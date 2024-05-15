import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Stack, TextField, DialogActions, MenuItem } from '@mui/material';
import { updatePayrunData } from '../services/api';

function Payrunbtn({ id }) {
    //handle dialog popup function
    console.log(id);
    const [openPopup, setOpenPopup] = useState(false);
    const [formData, setFormData] = useState({
        rate: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            await updatePayrunData(id, formData); // Call your API function to update payrun data
            console.log("Updating payrun data for ID:", id, formData);
            setOpenPopup(false); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error updating payrun data:', error);
        }
        // Here you can send formData to your backend API
        console.log('Form submitted:', id, formData);
        // Reset the form after submission
        setFormData({
            rate: '',
        });
    }
    const handleChange = (e) => {
        // Regular expression to allow only numbers
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
            setError(''); // Clear error if the input is valid
        } else {
            setError('Please enter numbers only');
        }
    }

    const handleUpdate = () => {
        setOpenPopup(true); // Open the dialog when the button is clicked
    }

    const handleClose = () => {
        setOpenPopup(false); // Close the dialog
        setError(''); // Clear error when dialog is closed
    }

    return (
        <div>
            <Button variant='contained' color='primary' onClick={handleUpdate}>
                Update
            </Button>
            <Dialog open={openPopup} onClose={handleClose} minWidth>
                <DialogTitle>Update Payrun</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            name="rate"
                            value={formData.rate}
                            onChange={handleChange}
                            variant="outlined"
                            label="Rate"
                            error={!!error}
                            helperText={error}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPopup(false)} variant='contained'>Cancel</Button>
                    <Button onClick={handleSubmit} variant='contained'>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Payrunbtn;
