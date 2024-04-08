import { useState } from "react";

import RealTimeOperation from "../component/RealTimeOperation";
import RealTimeIndicator from "../component/RealTimeIndicator";


const RestaurantStaff = () => {
    // State to trigger re-fetching of data in RealTimeIndicator
    const [updateIndicator, setUpdateIndicator] = useState(false);

    return ( 
        <div className="newbooking">
            <div className="bookings">
                <DineCustomerRegForm setUpdateIndicator={setUpdateIndicator} />
                <RealTimeIndicator updateIndicator={updateIndicator} />
            </div>
        </div>
    );
}

export default RestaurantStaff;
