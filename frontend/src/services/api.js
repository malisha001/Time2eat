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