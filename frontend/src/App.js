// pages & components

import Inventory from './component/FoodItems/Inventory'
import UpdateUser from './pages/update/UpdateUser';
import ItemForm from './pages/addItem/addItemForm';
import Usage from './pages/usage/usageForm';


import Home from './pages/Home/HomePage';
import Navbar from "./component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
// import RestaurantStaff from "./pages/RestaurantStaff";
import Feedback from './pages/Feedback';
import { BrowserRouter, Routes, Route,Navigate,useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import AddfeedbackForm from './component/AddfeedbackForm';
import UpdateFeedback from './component/Updatefeedback';
import UpdatePreBookings from './pages/UpdatePreBookings'
import UpdateDineIn from './pages/UpdateDineInBookings'
import DineCustomerRegForm from './pages/DineCustomerRegForm';
import DineInBookings from './pages/DineInBookings';
import Newbookingsstyle from './pages/Newbookingsstyle';
// import RealTimeIndicator from './component/RealTimeIndicator';
import AllCustomerDineInHistory from './pages/AllCustomerDineInHistory';
import EmployeeSal from './pages/EmployeeSal';
import EmpPayrun from './pages/EmpPayrun';

import RiderDashboard from './pages/RiderDashbord';
import OngoingOrder from './pages/OngoingOrder';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

import BookingPayment from './pages/BookingPayment';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Mybookingstyle from './component/Mybookingstyle';

function App() {
  const {user} = useAuthContext()
  return (
    <div>


      <BrowserRouter>

      
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
            <Route path ="/" element ={user ? <Home />: <Navigate to="/login" />}/>
      
            <Route path ="/login" element ={!user ? <Login />: <Navigate to="/" />}/>
          
            <Route path ="/signup" element ={!user ? <Signup/>: <Navigate to="/" />}/>

            
            <Route path="/newbooking/:id" element={<NewBooking />} />
            <Route path="/mybookings" element={<MyBookings />} />
            {/* <Route path="/update-booking/:id" element={<UpdateBookingDetails />} /> */}
            <Route path="/update-pre-booking/:id" element={<UpdatePreBookings />} />
            <Route path="/update-dine-in-booking/:id" element={<UpdateDineIn />} />
            <Route path="/bookingpayment" element={<BookingPayment />} />
            {/* <Route path="/realtime-staff" element={<RestaurantStaff />} /> */}

            <Route path="/dine-in-form" element={<DineCustomerRegForm />} />
            <Route path="/dine-in-bookings" element={<DineInBookings />} />
            <Route path="/stylepage" element={<Newbookingsstyle />} />
            {/* <Route path="/realtimeindecator" element={<RealTimeIndicator />} /> */}
            <Route path="/All-dine-in-booking-History" element={<AllCustomerDineInHistory />} />

            <Route path="/home" element={<Home />}/>

            <Route path="/feedback" element={<Feedback />}/>
            <Route path="/add-feedback" element={<AddfeedbackForm />}/>
            <Route path="/update-feedback/:id/" element={<UpdateFeedback />}/>
             
            <Route path='/employeesal' element={<EmployeeSal />}/>
            <Route path='/payrun' element={<EmpPayrun />}/>

            <Route path='/riderdashborad/*' element={<RiderDashboard />}/>
            <Route path='/riderdashborad/ongoingorder' element={<OngoingOrder/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/payment' element={<Payment/>} />

            <Route path="/inventory/items" element={<Inventory />} />
            <Route path="/inventory/addItems" element={<ItemForm />} />
            <Route path="/inventory/update/:id" element={<UpdateUser />} />
            <Route path="/inventory/usage" element={<Usage />} /> 

            <Route path="/restaurant/:id" element={<Mybookingstyle />} />

          </Routes>
        </div>  
      </BrowserRouter>




    </div>
  );
}

export default App;
