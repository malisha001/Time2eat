
//pages & components
import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import UpdateBookingDetails from "./Component/UpdateBookingDetails";
import RestaurantStaff from "./pages/RestaurantStaff";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'


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
            <Route path="/update-booking/:id" element={<UpdateBookingDetails />} />
            <Route path="/realtime-staff" element={<RestaurantStaff />} />
          </Routes>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
