// pages & components
import Home from './pages/Home/HomePage';
import Navbar from "./component/Navbar";
import Signup from './pages/Signup'
import Login from './pages/Login'

import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import RestaurantStaff from "./pages/RestaurantStaff";
import Feedback from './pages/Feedback';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext'

import AddfeedbackForm from './component/AddfeedbackForm';
import UpdateFeedback from './component/Updatefeedback';
import UpdatePreBookings from './pages/UpdatePreBookings'
import UpdateDineIn from './pages/UpdateDineInBookings'
import DineCustomerRegForm from './pages/DineCustomerRegForm';
import DineInBookings from './pages/DineInBookings';
import Newbookingsstyle from './pages/Newbookingsstyle';
import RealTimeIndicator from './component/RealTimeIndicator';
import AllCustomerDineInHistory from './pages/AllCustomerDineInHistory';
import EmployeeSal from './pages/EmployeeSal';
import EmpPayrun from './pages/EmpPayrun';
import BookingPayment from './pages/BookingPayment';
import AdvertisementForm from './components/AdvertisementForm';
import UpdateAdvertisementForm from './components/UpdateAdvertisementForm'; // Import your update form component
import AdvertisementPage  from './pages/AdvertisementPage'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">




      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
             
          <Route
              path ="/"
              element ={user ? <Home />: <Navigate to="/login" />}
          />
    
          <Route
              path ="/login"
              element ={!user ? <Login />: <Navigate to="/" />}
          />
        
          <Route
              path ="/signup"
              element ={!user ? <Signup/>: <Navigate to="/" />}
          />

            <Route path="/" element={<NewBooking />} />
            <Route path="/mybookings" element={<MyBookings />} />
            {/* <Route path="/update-booking/:id" element={<UpdateBookingDetails />} /> */}
            <Route path="/update-pre-booking/:id" element={<UpdatePreBookings />} />
            <Route path="/update-dine-in-booking/:id" element={<UpdateDineIn />} />
            <Route path="/bookingpayment" element={<BookingPayment />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />

            <Route path="/dine-in-form" element={<DineCustomerRegForm />} />
            <Route path="/dine-in-bookings" element={<DineInBookings />} />
            <Route path="/stylepage" element={<Newbookingsstyle />} />
            <Route path="/realtimeindecator" element={<RealTimeIndicator />} />
            <Route path="/All-dine-in-booking-History" element={<AllCustomerDineInHistory />} />

            <Route path="/home" element={<Home />}/>

            <Route path="/feedback" element={<Feedback />}/>
            <Route path="/add-feedback" element={<AddfeedbackForm />}/>
            <Route path="/update-feedback/:id/" element={<UpdateFeedback />}/>
             
            <Route path='/employeesal' element={<EmployeeSal />}/>
            <Route path='/payrun' element={<EmpPayrun />}/>
              
            <Route path ="/advertisement" element ={user ? <AdvertisementPage />: <Navigate to="/login" />}/>
            <Route path="/update-advertisement/:id" element={!user ?<UpdateAdvertisementForm />: <Navigate to="/" />} />
            <Route path="/create-advertisement" element={!user ?<AdvertisementForm />: <Navigate to="/" />} />
      
          </Routes>
        </div>
      </BrowserRouter>




    </div>
  );
}

export default App;
