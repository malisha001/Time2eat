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