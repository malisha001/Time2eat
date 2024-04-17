import {RiderContext} from '../context/RiderContext';
import {useContext} from 'react';

export const useRiderContext = () => {
    const context = useContext(RiderContext);

    if (!context) {
        throw new Error('useRiderContext must be used within a RiderProvider');
    }
    console.log("Context",context);
    return context;
}