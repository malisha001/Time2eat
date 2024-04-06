import axios from 'axios';
// Function to get all employee salary data
export async function getAllEmployeeSalaryData() {
    try {
        const response = await fetch('/api/employeesal');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee salary data:', error);
        throw error;
    }
}

// Function to add employee salary data
export async function addEmployeeSalaryData(employeeSalaryData) {
    try {
        const response = await fetch('/api/employeesal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeSalaryData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }
}

//get all employee details
export async function getAllEmployeeData() {
    try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
}

// Function to get all payrun data
export async function getPayrunData() {
    try {
        const response = await fetch('/api/emppayrun');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee payrun data:', error);
        throw error;
    }
}

// Function to update employee payrun data
export async function updateEmpPayrunData(empPayrunData) {
    try {
        const response = await fetch('/api/emppayrun', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empPayrunData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating employee payrun data:', error);
        throw error;
    }
}

// Function to update payrun data
export async function updatePayrunData(id,payrunData) {
    try {
        const response = await fetch(`/api/emppayrun/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payrunData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating payrun data:', error);
        throw error;
    }
}