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

//leaves
//get each restaurent leaves
export async function getRestaurentLeaves(id) {
    try {
        const response = await fetch(`/api/leaves/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching restaurent leaves data:', error);
        throw error;
    }
}


//function create employee salary
export async function createEmployeeSalary(empSalaryData) {
    try {
        const response = await fetch('/api/employeeleaves', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empSalaryData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating employee salary data:', error);
        throw error;
    }
}

//function to get all employee leaves
export async function getAllEmployeeLeaves() {
    try {
        const response = await fetch('/api/employeeleaves');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee leaves data:', error);
        throw error;
    }
}