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
//delete employee salary data
export async function deleteEmployeeSalaryData(id) {
    try {
        const response = await fetch(`/api/employeesal/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting employee salary data:', error);
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
//function paysalary
export async function paySalary() {
    try {
        const response = await fetch('/api/emppayrun/paysalary');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error paying salary:', error);
        throw error;
    }
}
//get all employee salaries
export async function fetchEmployeeSalaries() {
    try {
        const response = await fetch('/api/emppayrun/allempsalaries');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching employee salaries:', error);
        throw error;
    }

}
//delivery function
//customer place order by selecting delivery option
export async function placeorder(order) {
    try {
        const response = await fetch('/api/onlineOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }

}
//if delivery guy accept order, update riderSelected to true
export async function showRider(id,order) {
    try {
        const response = await fetch(`/api/onlineOrders/rider/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }

}
//check delivry guy accept order or not
export async function checkRider(id) {
    try {
        const response = await fetch(`/api/onlineOrders/customer/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }

}
//get delivery orders for riders
export async function getDeliveryOrders() {
    try {
        const response = await fetch('/api/onlineOrders/rider');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching delivery orders:', error);
        throw error;
    }
}
//get ongoing order for rider
export async function getOngoingOrder() {
    try {
        const response = await fetch('/api/deliveryorder');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ongoing order:', error);
        throw error;
    }
}

//when rider accept order that order goes to rider table
export async function acceptOrder(order) {
    console.log("api orderId:",order)
    try {
        const response = await fetch('/api/deliveryorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding employee salary data:', error);
        throw error;
    }
}

//get cart details for customer
export async function getCartData(id) {
    try {
        const response = await fetch(`/api/carts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}
//delete cart data dilvery guy not accept order
export async function deleteCartData(id) {
    try {
        const response = await fetch(`/api/carts/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting cart data:', error);
        throw error;
    }

}
