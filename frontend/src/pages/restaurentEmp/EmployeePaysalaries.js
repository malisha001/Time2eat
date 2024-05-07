import React, { useEffect, useState } from 'react';
import { Table,TextField, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper, Button, Toolbar, Typography, IconButton, Menu, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchEmployeeSalaries,getAllEmployeeData} from '../../services/api';

function EmployeePaysalaries() {

  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeIDs, setEmployeeIDs] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    employeeId: '',
    year: '',
    month: ''
  });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterApply = () => {
    console.log('Filter Criteria:', filterCriteria);

    // Filter the employee salaries based on the selected criteria
    const data = employeeSalaries.filter(empsal =>{
      const salaryDate = new Date(empsal.createdAt);
      const slaryyear = salaryDate.getFullYear();
      const slarymonth = salaryDate.getMonth() + 1;
      return empsal.empId === filterCriteria.employeeId || 
      slaryyear === filterCriteria.year || 
      slarymonth === filterCriteria.month;
      
    } );

    console.log('Filter Data:', filterCriteria.year);
  // Update the state with the filtered data
  setEmployeeSalaries(data);

    setAnchorEl(null); // Close the filter popup after applying
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });

  };
  //get all employee salary data
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

    const getAllEmployeeSalaryData = async () => {
      try {
        const salaryData = await fetchEmployeeSalaries();
        setEmployeeSalaries(salaryData);
        console.log(salaryData);
      } catch (error) {
        console.error('Error fetching employee salaries:', error);
      }
    };

    fetchEmployeeIDs();
    getAllEmployeeSalaryData();    
  }, []); // Add any dependencies as needed

  return (
    <div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Paysalaries
        </Typography>
      <Toolbar>
        <IconButton color="inherit" onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
        <IconButton color="inherit">
          <DownloadIcon />
        </IconButton>
        
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: 'lightblue' }}>
              <TableCell>Employee ID</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>net salary</TableCell>
              <TableCell>bonus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {employeeSalaries.map((salaryData) => (
            <TableRow key={salaryData._id}>
              <TableCell>{salaryData.empId}</TableCell>
              <TableCell>{salaryData.basicEmpSalary}</TableCell>
              <TableCell>{salaryData.Fsalary}</TableCell>
              <TableCell>{salaryData.bonusRate}</TableCell>
              <TableCell><IconButton variant='contained' style={{ color: 'red' }}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Filter Popup */}
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              select
              labelId="employeeId-label"
              id="employeeId"
              name="employeeId"
              value={filterCriteria.employeeId}
              onChange={handleInputChange}
              label="Emp Id"
            >
              {employeeIDs.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              select
              labelId="restaurantId-label"
              id="year"
              name="year"
              value={filterCriteria.year}
              onChange={handleInputChange}
              label="year"
            >
              <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              {/* Add dropdown options here */}
            </TextField>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              select
              labelId="position-label"
              id="month"
              name="month"
              value={filterCriteria.position}
              onChange={handleInputChange}
              label="month"
            >
              <MenuItem value={1}>jan</MenuItem>
              <MenuItem value={2}>feb</MenuItem>
              <MenuItem value={3}>march</MenuItem>
              <MenuItem value={4}>april</MenuItem>
              <MenuItem value={5}>may</MenuItem>
              <MenuItem value={6}>june</MenuItem>
              <MenuItem value={7}>july</MenuItem>
              <MenuItem value={8}>aug</MenuItem>
              <MenuItem value={9}>sep</MenuItem>
              <MenuItem value={10}>oct</MenuItem>
              <MenuItem value={11}>nov</MenuItem>
              <MenuItem value={12}>dec</MenuItem>
              {/* Add dropdown options here */}
            </TextField>
          </FormControl>
          <Button variant="contained" onClick={handleFilterApply}>Apply</Button>
        </Box>
      </Menu>
    </div>
  );
}

export default EmployeePaysalaries;
