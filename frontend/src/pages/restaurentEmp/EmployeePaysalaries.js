import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper, Button, Toolbar, Typography, IconButton, Menu, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchEmployeeSalaries} from '../../services/api';

function EmployeePaysalaries() {

    const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    employeeId: '',
    restaurantId: '',
    position: ''
  });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterApply = () => {
    // Add logic to apply filter criteria (e.g., fetching filtered data)
    console.log('Filter Criteria:', filterCriteria);
    setAnchorEl(null); // Close the filter popup after applying
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });

  };
  //get all employee salary data
  useEffect(() => {
    const getAllEmployeeSalaryData = async () => {
      try {
        const salaryData = await fetchEmployeeSalaries();
        setEmployeeSalaries(salaryData);
        console.log(salaryData);
      } catch (error) {
        console.error('Error fetching employee salaries:', error);
      }
    };

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
            <InputLabel id="employeeId-label">Employee ID</InputLabel>
            <Select
              labelId="employeeId-label"
              id="employeeId"
              name="employeeId"
              value={filterCriteria.employeeId}
              onChange={handleInputChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              {/* Add dropdown options here */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="restaurantId-label">year</InputLabel>
            <Select
              labelId="restaurantId-label"
              id="restaurantId"
              name="restaurantId"
              value={filterCriteria.restaurantId}
              onChange={handleInputChange}
            >
              <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              {/* Add dropdown options here */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="position-label">month</InputLabel>
            <Select
              labelId="position-label"
              id="position"
              name="position"
              value={filterCriteria.position}
              onChange={handleInputChange}
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
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleFilterApply}>Apply</Button>
        </Box>
      </Menu>
    </div>
  );
}

export default EmployeePaysalaries;
