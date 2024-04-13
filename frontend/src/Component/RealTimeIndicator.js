import { useEffect, useState } from "react";
import axios from "axios";

const RealTimeIndicator = ({ updateIndicator }) => {
    const [tableCount, setTableCount] = useState({ couple: 0, group: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/realtimebooking');
                
                // Calculate total tables for both couple and group
                const totalCoupleTables = response.data.reduce((total, table) => total + table.couplequantity, 0);
                const totalGroupTables = response.data.reduce((total, table) => total + table.groupquantity, 0);

                // Update table count state
                setTableCount({ couple: totalCoupleTables, group: totalGroupTables });
            } catch (error) {
                console.log('Error fetching table data:', error);
            }
        };
    
        fetchData();
    }, [updateIndicator]);

    return (
        <div>
            <h3>Total couple tables: {tableCount.couple}</h3>
            <h3>Total group tables: {tableCount.group}</h3>
        </div>
    );
}

export default RealTimeIndicator;
