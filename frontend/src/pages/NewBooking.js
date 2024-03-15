import BookingForm from '../Component/Bookingform';
import ParentComponent from '../Component/ParentComponent';
const NewBooking = () => {
   
    return ( 
        <div className="newbooking">
            <div className="bookings">
            <BookingForm />
            <ParentComponent/>
            
          
             </div>
            
        </div>
    );
};
 
export default NewBooking;
