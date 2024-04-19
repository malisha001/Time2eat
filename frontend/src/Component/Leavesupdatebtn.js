import React from 'react';
import { Button } from '@mui/material';

function LeavesUpdateBtn() {
    const [openPopup, setOpenPopup] = useState(false);

    const handleUpdate = () => {
        setOpenPopup(true); // Open the dialog when the button is clicked
    }
    const handleClose = () => {
        setOpenPopup(false); // Close the dialog
    }
    const [formData, setFormData] = useState({
        leaves: '',
    });
    const handleSubmit = async() => {
        
        try {
            await updatePayrunData(id,formData); // Call your API function to update payrun data
            console.log("Updating payrun data for ID:", id, formData);
            setOpenPopup(false); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error updating payrun data:', error);
        }
        // Here you can send formData to your backend API
        console.log('Form submitted:',id, formData);
        // Reset the form after submission
        setFormData({
            rate: '',
        });
    }

    return (
        <div>
            <Button variant='contained' color='primary' onClick={handleUpdate}>
                Update
            </Button>
            <Dialog open={openPopup} onClose={handleClose} minWidth>
                <DialogTitle>update leaves</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField name="leaves" value={formData.leaves} onChange={handleChange} variant="outlined" label="rate" minWidth />
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

export default LeavesUpdateBtn;