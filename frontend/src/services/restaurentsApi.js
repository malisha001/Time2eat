import { wait } from "@testing-library/user-event/dist/utils";

//function get all restaurents in home page
export async function getAllRestaurents() {
    try {
        const response = await fetch('/api/restaurants/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching restaurents data:', error);
        throw error;
    }
}

//add employee
export async function createmployee(employeedata){
    try {
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeedata),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }
}

//get employee datails
export async function getemployeedetails(){
    try {
        const response = await fetch('/api/employees/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
}

//delete employee
export async function deleteEmployeeData(id){
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting employee data:', error);
        throw error;
    }
}