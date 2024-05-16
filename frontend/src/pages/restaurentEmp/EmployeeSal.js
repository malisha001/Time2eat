import React, { useState, useEffect } from 'react';
import EmployeeNav from '../../component/employeeNavbar/EmployeeNav';
import AddIcon from '@mui/icons-material/Add';
import {Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack, TextField, MenuItem, Divider } from '@mui/material';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { addEmployeeSalaryData, getAllEmployeeData, getAllEmployeeSalaryData, deleteEmployeeSalaryData } from '../../services/api';
import Resuppernav from '../../component/restauretNavbar/Resuppernav';
import ResNavbar from '../../component/restauretNavbar/ResNavbar';
import { useAuthContext } from '../../hooks/useAuthContext';
import toast, { Toaster } from 'react-hot-toast';

const EmployeeSal = () => {
  const {user} = useAuthContext()
  const [openPopup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({
    empId: '',
    resId: '',
    basicEmpSalary: '',
    empCatagory: '',
    bonusRate: '',
    taxRate: ''
  });

  const [employeeIDs, setEmployeeIDs] = useState([]);
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [bonusRateError, setBonusRateError] = useState(false);
  const [basicEmpSalaryError, setBasicEmpSalaryError] = useState(false);
  const [taxRateError, setTaxRateError] = useState(false);
  const [empCatagoryError, setEmpCatagoryError] = useState(false);
  console.log("idd",employeeIDs)

  useEffect(() => {
    const fetchEmployeeIDs = async () => {
      try {
        const Empdata = await getAllEmployeeData(user.resId);
        const ids = Empdata.map(item => item.empId);
        setEmployeeIDs(ids);
      } catch (error) {
        console.error('Error fetching employee IDs:', error);
      }
    };

    const fetchEmployeeSalaries = async () => {
      try {
        const salaryData = await getAllEmployeeSalaryData(user.resId);
        setEmployeeSalaries(salaryData);
        console.log("salaryData",salaryData)
      } catch (error) {
        console.error('Error fetching employee salaries:', error);
      }
    };

    fetchEmployeeSalaries();
    fetchEmployeeIDs();
  }, [user,formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = false;

    // Validate numeric fields
    if (name === 'bonusRate' || name === 'basicEmpSalary' || name === 'taxRate') {
      if (isNaN(value)) {
        error = true;
      }
    }

    // Validate position contains only letters
    if (name === 'empCatagory') {
      if (!/^[a-zA-Z]+$/.test(value)) {
        error = true;
      }
    }

    // Update error state
    switch (name) {
      case 'bonusRate':
        setBonusRateError(error);
        break;
      case 'basicEmpSalary':
        setBasicEmpSalaryError(error);
        break;
      case 'taxRate':
        setTaxRateError(error);
        break;
      case 'empCatagory':
        setEmpCatagoryError(error);
        break;
      default:
        break;
    }

    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const deletebutton = async (id) => {
    // Display confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this employee salary data?');
    
    // Check if the user confirmed
    if (confirmed) {
        try {
            await deleteEmployeeSalaryData(id);
            console.log('Employee salary data deleted successfully.');
            // You can perform any additional actions after successful deletion here
        } catch (error) {
            console.error('Error deleting employee salary data:', error);
            // Handle error
        }
    } else {
        // User cancelled the action, do nothing
        console.log('Deletion cancelled by user.');
    }
};

  const handleSubmit = async () => {
    try {
        const data = {
          empId: formData.empId,
          resId: user.resId,
          basicEmpSalary: formData.basicEmpSalary,
          empCatagory: formData.empCatagory,
        };
       let res = await addEmployeeSalaryData(data);
       console.log("emp data",res);
       

      // if (error) {
      //   throw new Error(error);
      // }

      setOpenPopup(false);
    } catch (error) {
      toast.error("sfsfbsb");
      
      console.error('Error adding employee salary data:', error);
      // alert(error)
    }
    setFormData({
      empId: '',
      resId: '',
      basicEmpSalary: '',
      empCatagory: '',
    });
    setOpenPopup(false);
  };

  return (
    <div>
      <div><Toaster/></div>
      <ResNavbar/>
      <div className="Inv-dashborad">
      <Resuppernav/>
        <h1>Employee Salary Page</h1>
        <EmployeeNav />
        <br/>
        <Divider/>
        <br/>
        <Button
          variant="contained"
          onClick={() => setOpenPopup(true)}
        >
          <AddIcon /> Add
        </Button>

        <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth>
          <DialogTitle>Add Employee Salary</DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                select
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                variant="outlined"
                label="Employee ID"
                fullWidth
                
              >
                {employeeIDs.map((id) => (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                ))}
              </TextField>
              <TextField name="basicEmpSalary" value={formData.basicEmpSalary} onChange={handleChange} variant="outlined" label="Basic Salary" fullWidth error={basicEmpSalaryError} helperText={basicEmpSalaryError ? "Please enter a numeric value" : ""} required/>
              <TextField name="empCatagory" value={formData.empCatagory} onChange={handleChange} variant="outlined" label="Position" fullWidth error={empCatagoryError} helperText={empCatagoryError ? "Please enter only letters" : ""} required/>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPopup(false)} variant='contained'>Cancel</Button>
            <Button onClick={handleSubmit} variant='contained'>Submit</Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{bgcolor: 'lightblue'}}>
                <TableCell>Employee ID</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Position</TableCell>
                {/* <TableCell>Bonus Rate</TableCell>
                <TableCell>Tax Rate</TableCell> */}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{bgcolor: 'lightgrey'}}>
              {employeeSalaries.map((salaryData) => (
                <TableRow key={salaryData.id}>
                  <TableCell>{salaryData.empId}</TableCell>
                  <TableCell>{salaryData.basicEmpSalary}</TableCell>
                  <TableCell>{salaryData.empCatagory}</TableCell>
                  {/* <TableCell>{salaryData.bonusRate}</TableCell>
                  <TableCell>{salaryData.taxRate}</TableCell> */}
                  <TableCell><Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deletebutton(salaryData._id)} variant='contained'>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default EmployeeSal;
