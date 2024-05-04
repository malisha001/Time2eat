import React, { useState, useEffect } from 'react';
import EmployeeNav from '../../component/employeeNavbar/EmployeeNav';
import AddIcon from '@mui/icons-material/Add';
import {Dialog, DialogTitle, DialogContent, Button, DialogActions, Stack, TextField, MenuItem, Divider } from '@mui/material';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { addEmployeeSalaryData, getAllEmployeeData, getAllEmployeeSalaryData, deleteEmployeeSalaryData } from '../../services/api';

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
  const [bonusRateError, setBonusRateError] = useState(false);
  const [basicEmpSalaryError, setBasicEmpSalaryError] = useState(false);
  const [taxRateError, setTaxRateError] = useState(false);
  const [empCatagoryError, setEmpCatagoryError] = useState(false);

  useEffect(() => {
    const fetchEmployeeIDs = async () => {
      try {
        const Empdata = await getAllEmployeeData();
        const ids = Empdata.map(item => item.empId);
        setEmployeeIDs(ids);
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
    fetchEmployeeIDs();
  }, []);

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
    try {
      await deleteEmployeeSalaryData(id);
    } catch (error) {
      console.error('Error deleting employee salary data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
       await addEmployeeSalaryData(formData);

      // if (error) {
      //   throw new Error(error);
      // }

      setOpenPopup(false);
    } catch (error) {
      console.error('Error adding employee salary data:', error);
      // alert(error)
    }
    setFormData({
      empId: '',
      resId: '',
      basicEmpSalary: '',
      empCatagory: '',
      bonusRate: '',
      taxRate: ''
    });
    setOpenPopup(false);
  };

  return (
    <div>
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
              required
            >
              {employeeIDs.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </TextField>
            <TextField name="resId" value={formData.resId} onChange={handleChange} variant="outlined" label="Restaurant ID" fullWidth required/>
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
              <TableCell>Restaurant ID</TableCell>
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
                <TableCell>{salaryData.resId}</TableCell>
                <TableCell>{salaryData.basicEmpSalary}</TableCell>
                <TableCell>{salaryData.empCatagory}</TableCell>
                {/* <TableCell>{salaryData.bonusRate}</TableCell>
                <TableCell>{salaryData.taxRate}</TableCell> */}
                <TableCell><Button onClick={() => deletebutton(salaryData._id)} variant='contained'>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeSal;
