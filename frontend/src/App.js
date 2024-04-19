// pages & components
import Home from './pages/Home';

import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import UpdateBookingDetails from "./Component/UpdateBookingDetails";
import RestaurantStaff from "./pages/RestaurantStaff";
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  const {user} = useAuthContext()
  return (
    <div>


      <BrowserRouter>
        <Navbar />
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
            <Route path="/update-booking/:id" element={<UpdateBookingDetails />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />
             <Route path="/inventory" element={<Home />}
              />
          </Routes>
        </div>  
      </BrowserRouter>




    </div>
  );
}

export default App;
