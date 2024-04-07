import { useState } from "react";
import DineCustomerRegForm from "../pages/DineCustomerRegForm";
import RealTimeIndicator from "../Component/RealTimeIndicator";

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
