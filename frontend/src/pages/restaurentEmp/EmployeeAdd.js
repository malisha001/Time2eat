import React, { useState,useEffect } from 'react';
import Resuppernav from '../../component/restauretNavbar/Resuppernav';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack, TextField, MenuItem, Divider } from '@mui/material';
import { createmployee,getemployeedetails,deleteEmployeeData } from '../../services/restaurentsApi';
import ResNavbar from '../../component/restauretNavbar/ResNavbar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EmployeeNav from '../../component/employeeNavbar/EmployeeNav';

function EmployeeAdd() {
    const [openDialog, setOpenDialog] = useState(false);
    const [showdata, setshowdata] = useState([]);
    const [employeedata,setemployeedata] = useState({
        empId: '',
        empname: '',
        position: '',
        telnum: '',
    })

    const deletebutton = async (id) => {
        console.log('id',id)
        try {
          await deleteEmployeeData(id);
        } catch (error) {
          console.error('Error deleting employee salary data:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async() => {
        try {
            const empdata = await createmployee(employeedata);
            console.log('empdata',empdata)
        } catch (error) {
            console.error('Error adding employee data:', error);
        }
        handleCloseDialog(); // Close the dialog after submission
    };

    const handlechange = (e)=>{
        const { name, value } = e.target;
        setemployeedata(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        //fetch employee data
        const fetchEmployeeData = async () => {
            try {
                const empdata = await getemployeedetails();
                setshowdata(empdata);
            } catch (error) {
                console.error('Error fetching employee data:', error);
        }
    }
        fetchEmployeeData();
    }, []);

    return (
        <div>
            <ResNavbar/>
            <div className="Inv-dashborad">
                <Resuppernav/>
                <h1>Employee Add Page</h1>
                <EmployeeNav />
                <br/>
                <Divider/>
                <br/>
                <Button
                    variant="contained"
                    onClick={handleOpenDialog}
                >
                    <AddIcon /> Add employee
                </Button>
                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                    <DialogTitle>Add Employee</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={2}>
                            <TextField name="empId" value={employeedata.empId} onChange={handlechange} variant="outlined" label="empId" fullWidth/>
                            <TextField name="empname" value={employeedata.empname} onChange={handlechange} variant="outlined" label="empname" fullWidth/>
                            <TextField name="position" value={employeedata.position} onChange={handlechange} variant="outlined" label="position" fullWidth/>
                            <TextField name="telnum" value={employeedata.telnum} onChange={handlechange} variant="outlined" label="phonNumber" fullWidth/>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSubmit}>Confirm</Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>empId</TableCell>
                                <TableCell>empname</TableCell>
                                <TableCell>position</TableCell>
                                <TableCell>tele No</TableCell>
                                <TableCell>action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {showdata.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>{data.empId}</TableCell>
                                <TableCell>{data.empname}</TableCell>
                                <TableCell>{data.position}</TableCell>
                                <TableCell>{data.telnum}</TableCell>
                                <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => deletebutton(data._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default EmployeeAdd;
