
// pages & components
import Home from './pages/Home';
import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import RestaurantStaff from "./pages/RestaurantStaff";
import DineCustomerRegForm from "./pages/DineCustomerRegForm"
import DineInBookings from './pages/DineInBookings'
import UpdatePreBookings from './pages/UpdatePreBookings'
import UpdateDineIn from './pages/UpdateDineInBookings'
import Newbookingsstyle from './pages/Newbookingsstyle'
import RealTimeIndicator from "./Component/RealTimeIndicator";
import AllCustomerDineInHistory from "./pages/AllCustomerDineInHistory";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import AddfeedbackForm from './Component/AddfeedbackForm';
import UpdateFeedback from './Component/Updatefeedback';


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
            <Route path="/update-dine-in-booking/:id" element={<UpdateDineIn />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />

            <Route path="/dine-in-form" element={<DineCustomerRegForm />} />
            <Route path="/dine-in-bookings" element={<DineInBookings />} />
            <Route path="/stylepage" element={<Newbookingsstyle />} />
            <Route path="/realtimeindecator" element={<RealTimeIndicator />} />
            <Route path="/All-dine-in-booking-History" element={<AllCustomerDineInHistory />} />

             <Route path="/inventory" element={<Home />}/>

             <Route path="/feedback" element={<Feedback />}/>
             <Route path="/add-feedback" element={<AddfeedbackForm />}/>
             <Route path="/update-feedback/:id/" element={<UpdateFeedback />}/>
             
             
              


          </Routes>
        </div>
      </BrowserRouter>




    </div>
  );
}

export default App;
