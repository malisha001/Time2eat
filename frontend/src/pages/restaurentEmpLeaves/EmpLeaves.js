import React from 'react';
import EmployeeNav from '../../component/employeeNavbar/EmployeeNav';
import { Grid,Box, Divider, Button,IconButton,Table,TableHead,TableRow,TableCell,TableBody,TableContainer,Paper } from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import{ useState, useEffect } from 'react';
import {getAllEmployeeData} from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EmpLeaves.css';
import ResNavbar from '../../component/restauretNavbar/ResNavbar';
import { useAuthContext } from '../../hooks/useAuthContext';

function EmpLeaves() {
    const {user} = useAuthContext()
    const [openPopup, setOpenPopup] = useState(false);
    const[openPopupEdit, setOpenPopupEdit] = useState(false);
    const[openPopupfee, setOpenPopupfee] = useState(false);
    const [employeeLeaves, setemployeeLeaves] = useState([]);
    const [employeeIDs, setEmployeeIDs] = useState([]);
    const [formData, setFormData] = useState({
        empId: '',
        leavetype: '',
        fromDate: null, // New state for the date picker: '',
        toDate: null,
        numdate: '',
        
      });
    //error msg
    const [basicEmpSalaryError, setBasicEmpSalaryError] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = date => {
      setSelectedDate(date);
    };

    useEffect(() => {
        //fetch employee employee ids
        const fetchEmployeeIDs = async () => {
            try {
              const Empdata = await getAllEmployeeData(user.resId);
              const ids = Empdata.map(item => item.empId);
              setEmployeeIDs(ids);
            } catch (error) {
              console.error('Error fetching employee IDs:', error);
            }
          };

          fetchEmployeeIDs();
    }, [user]);
    const handleSubmit = async () => {
        try {

    
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
          leavetype: '',
          fromDate: null,
          toDate: null, // Reset date picker value after submission
          numdate: '',
          
        });
        setOpenPopup(false);
    };

    const handleChange = (e) =>{
        const { name, value } = e.target;
        let error = false;

        // Update form data
        setFormData({
        ...formData,
        [name]: value
      });
    }
    return (
        <div>
            <ResNavbar/>
            <div className="Inv-dashborad">
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <h1>Employee Leaves</h1>
                </Grid>
                <Grid item xs={6} sx={{textAlign: 'right', paddingRight: '40px',marginTop: '30px'}}>
                    <Button variant="contained" onClick={()=> setOpenPopup(true)}><AddIcon />add leaves</Button>
                </Grid>
            </Grid>
            
            {/* add leave dialog box */}
            <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth>
                <DialogTitle>Add Employee leaves</DialogTitle>
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
                        <TextField name="leavetype" value={formData.leavetype} onChange={handleChange} variant="outlined" label="leave type" fullWidth error={basicEmpSalaryError} helperText={basicEmpSalaryError ? "Please enter a numeric value" : ""}/>
                        <div className="datepicker-label">From</div>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy"
                          value={formData.fromDate}
                          className="custom-datepicker"
                        />
                        <div className="datepicker-label">To</div>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy"
                          className="custom-datepicker"
                          value={formData.toDate}
                        />
                        <TextField name="numdate" value={formData.numdate} onChange={handleChange} variant="outlined" label="number of days" fullWidth error={basicEmpSalaryError} helperText={basicEmpSalaryError ? "Please enter a numeric value" : ""}/>

                    </Stack>
                  </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenPopup(false)} variant='contained'>Cancel</Button>
                  <Button onClick={handleSubmit} variant='contained'>Submit</Button>
                </DialogActions>
            </Dialog>
            <Divider/>
            <br />
            <EmployeeNav />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <p>monthly leaves:12days</p>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={()=> setOpenPopupEdit(true)}><EditIcon /></IconButton>
                </Grid>
                {/* edit employee leaves */}
                <Dialog open={openPopupEdit} onClose={() => setOpenPopupEdit(false)} fullWidth>
                      <DialogTitle>Edit Employee leaves</DialogTitle>
                      <DialogContent>
                        <Stack>
                          <TextField name="basicEmpSalary" value={formData.basicEmpSalary} onChange={handleChange} variant="outlined" label="number of days" fullWidth error={basicEmpSalaryError} helperText={basicEmpSalaryError ? "Please enter a numeric value" : ""}/>
                        </Stack>
                      </DialogContent>
                </Dialog>
                <Grid item xs={4}>
                    <p>panalty feee: Rs.200</p>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={()=> setOpenPopupfee(true)}><EditIcon /></IconButton>
                </Grid>
                {/* edit employee fee panalty */}
                <Dialog open={openPopupfee} onClose={() => setOpenPopupfee(false)} fullWidth>
                      <DialogTitle>Edit Employee panalty fee</DialogTitle>
                      <DialogContent>
                        <Stack>
                          <TextField name="basicEmpSalary" value={formData.basicEmpSalary} onChange={handleChange} variant="outlined" label="number of days" fullWidth error={basicEmpSalaryError} helperText={basicEmpSalaryError ? "Please enter a numeric value" : ""}/>
                        </Stack>
                      </DialogContent>
                </Dialog>
            </Grid>
            <br />
            <br />
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
            {employeeLeaves.map((salaryData) => (
              <TableRow key={salaryData.id}>
                <TableCell>{salaryData.empId}</TableCell>
                <TableCell>{salaryData.resId}</TableCell>
                <TableCell>{salaryData.basicEmpSalary}</TableCell>
                <TableCell>{salaryData.empCatagory}</TableCell>
                {/* <TableCell>{salaryData.bonusRate}</TableCell>
                <TableCell>{salaryData.taxRate}</TableCell> */}
                <TableCell><IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
        </div>
    );
}

export default EmpLeaves;