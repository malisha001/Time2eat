

// pages & components
import Home from './pages/Home';

import Navbar from "./Component/Navbar";
import MyBookings from "./pages/MyBookings";
import NewBooking from "./pages/NewBooking";
import UpdateBookingDetails from "./Component/UpdateBookingDetails";
import RestaurantStaff from "./pages/RestaurantStaff";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import AddfooditemsForm from './Component/AddfooditemsForm';



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
             <Route path="/inventory" element={<Home />} />
            <Route path="/fooditems" element = {<Menu />} />
            <Route path="/add-food-item" element = {<AddfooditemsForm />} />
          </Routes>
        </div>
      </BrowserRouter>




    </div>
  );
}

export default App;
