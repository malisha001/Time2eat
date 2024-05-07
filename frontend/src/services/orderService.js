import axios from 'axios';

export const createOrder = async order => {   //we gets the order that we pass from the checkout page 
    try{
        const { data } = await axios.post('/api/orders/create', order);  // send that order data to this address
        return data;
    }catch (error) {}
};


export const getNewOrderForCurrentUser = async () => {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
    return data;
};