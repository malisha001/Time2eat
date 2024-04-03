import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import UpdateBookingDetails from "./Component/UpdateBookingDetails";
import RestaurantStaff from "./pages/RestaurantStaff";
import DineCustomerRegForm from "./pages/DineCustomerRegForm"
import UpdateDineInBookings from "./pages/UpdateDineInBookings"
import DineInBookings from './pages/DineInBookings'
import UpdatePreBookings from './pages/UpdatePreBookings'
import Newbookingsstyle from './pages/Newbookingsstyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllCustomerDineInHistory from "./pages/AllCustomerDineInHistory";



function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<NewBooking />} />
            <Route path="/mybookings" element={<MyBookings />} />
            {/* <Route path="/update-booking/:id" element={<UpdateBookingDetails />} /> */}
            <Route path="/update-pre-booking/:id" element={<UpdatePreBookings />} />
            <Route path="/update-dine-in-booking/:id" element={<UpdateDineInBookings />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />
            <Route path="/dine-in-form" element={<DineCustomerRegForm />} />
            <Route path="/dine-in-bookings" element={<DineInBookings />} />
            <Route path="/stylepage" element={<Newbookingsstyle />} />
            <Route path="/All-dine-in-booking-History" element={<AllCustomerDineInHistory />} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
