import React, { useState,useEffect } from 'react';
import EmployeeNav from '../component/EmployeeNav';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, DialogContent, Button,DialogActions, Stack, TextField,MenuItem } from '@mui/material';
import {Table, TableBody, TableHead, TableRow, TableCell,TableContainer,Paper} from '@mui/material';
import {addEmployeeSalaryData,getAllEmployeeData,getAllEmployeeSalaryData} from '../services/api';

const EmployeeSal = () => {
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

  useEffect(() => {
    const fetchEmployeeIDs = async () => {
      try {
        const Empdata = await getAllEmployeeData(); // Call your API function to fetch employee IDs
        const ids = Empdata.map(item => item.empId)
        console.log(ids)
        setEmployeeIDs(ids); // Update state with the fetched employee IDs
        
      } catch (error) {
        console.error('Error fetching employee IDs:', error);
      }
    };

    const fetchEmployeeSalaries = async () => {
      try {
        const salaryData = await getAllEmployeeSalaryData();
        setEmployeeSalaries(salaryData);
      } catch (error) {
        console.error('Error fetching employee salaries:', error);
      }
    };

    fetchEmployeeSalaries();
    fetchEmployeeIDs(); // Fetch employee IDs when component mounts
  }, []); // Run this effect only once when component mounts

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async() => {

    try {
      await addEmployeeSalaryData(formData) // Call your API function to add employee salary data
      setOpenPopup(false)  // Close the dialog after successful submission
    } catch (error) {
      console.error('Error adding employee salary data:', error);
    }
    // Here you can send formData to your backend API
    console.log('Form submitted:', formData);
    // Reset the form after submission
    setFormData({
      empId: '',
      resId: '',
      basicEmpSalary: '',
      empCatagory: '',
      bonusRate: '',
      taxRate: ''
    });
    // Close the dialog
    setOpenPopup(false);
  };

  return (
    <div>
      <div>
      <h1>Employee Salary Page</h1>
      <EmployeeNav />
      <p>oopz</p>
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
                      value={formData.employeeID} 
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
                    <TextField name="resId" value={formData.Empname} onChange={handleChange} variant = "outlined" label = "restaurentId" fullWidth />
                    <TextField name="basicEmpSalary" value={formData.position} onChange={handleChange} variant = "outlined" label = "basic salary" fullWidth />
                    <TextField name="empCatagory" value={formData.Bsalary} onChange={handleChange} variant = "outlined" label = "position" fullWidth />
                </Stack>
            Earning
                <Stack spacing={2} margin={2}>
                    <TextField name="bonusRate" value={formData.bonus} onChange={handleChange} variant = "outlined" label = "bonus" fullWidth />
                </Stack>
            Deduction
                <Stack spacing={2} margin={2}>
                    <TextField name="taxRate" value={formData.tax} onChange={handleChange} variant = "outlined" label = "tax" fullWidth />
                </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPopup(false)} variant='contained'>Cancel</Button>
              <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </DialogActions>
        </Dialog>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Restaurant ID</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Bonus Rate</TableCell>
                <TableCell>Tax Rate</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeSalaries.map((salaryData) => (
                <TableRow key={salaryData.id}>
                  <TableCell>{salaryData.empId}</TableCell>
                  <TableCell>{salaryData.resId}</TableCell>
                  <TableCell>{salaryData.basicEmpSalary}</TableCell>
                  <TableCell>{salaryData.empCatagory}</TableCell>
                  <TableCell>{salaryData.bonusRate}</TableCell>
                  <TableCell>{salaryData.taxRate}</TableCell>
                  <TableCell>delete</TableCell>
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
