import { useEffect, useState } from "react";
import axios from "axios";

const RealTimeIndicator = ({ updateIndicator }) => {
    const [tableCount, setTablecount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/realtimebooking');
                const availableTables = response.data.filter(table => table.availability);
                const totalTables = availableTables.reduce((total, table) => total + table.quantity, 0);
                setTablecount(totalTables);
            } catch (error) {
                console.log('Error fetching table data:', error);
            }
        };
    
        fetchData();
    }, [updateIndicator]);
    ; // Include updateIndicator in the dependency array

    return (
        <div>
            <h3>Total tables: {tableCount}</h3>
        </div>
    );
}

export default RealTimeIndicator;
