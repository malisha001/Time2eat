import { useState } from "react";
import RealTimeOperation from "../Component/RealTimeOperation";
import RealTimeIndicator from "../Component/RealTimeIndicator";

const RestaurantStaff = () => {
    // State to trigger re-fetching of data in RealTimeIndicator
    const [updateIndicator, setUpdateIndicator] = useState(false);

    return ( 
        <div className="newbooking">
            <div className="bookings">
                <RealTimeOperation setUpdateIndicator={setUpdateIndicator} />
                <RealTimeIndicator updateIndicator={updateIndicator} />
            </div>
        </div>
    );
}

export default RestaurantStaff;
