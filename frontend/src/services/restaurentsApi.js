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

//add restaurent leaves
export async function addRestaurentLeaves(data) {
    try {
        const response = await fetch('/api/leaves/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error adding restaurent leaves:', error);
        throw error;
    }
}