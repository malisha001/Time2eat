
// pages & components
import Home from './pages/Home';

import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import UpdateBookingDetails from "./Component/UpdateBookingDetails";
import RestaurantStaff from "./pages/RestaurantStaff";
import Feedback from './pages/Feedback';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import AddfeedbackForm from './Component/AddfeedbackForm';
import UpdateFeedback from './Component/Updatefeedback';

function App() {
  return (
    <div className="App">




      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<NewBooking />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/update-booking/:id" element={<UpdateBookingDetails />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />
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
