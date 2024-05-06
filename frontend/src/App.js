// pages & components

import Inventory from './component/FoodItems/Inventory'
import UpdateUser from './pages/update/UpdateUser';
import ItemForm from './pages/addItem/addItemForm';
import Usage from './pages/usage/usageForm';
import Reglogin from './pages/login/RestaurentLogin'

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
import EmployeeSal from './pages/restaurentEmp/EmployeeSal';
import EmpPayrun from './pages/restaurentEmp/EmpPayrun';
import Empleaves from './pages/restaurentEmpLeaves/EmpLeaves';
import EmployeePaysalaries from './pages/restaurentEmp/EmployeePaysalaries';

import RiderDashboard from './pages/riders/RiderDashbord';
import OngoingOrder from './pages/riders/OngoingOrder';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

import BookingPayment from './pages/BookingPayment';
import ResPage from './pages/ResPage/ResPage.js';
import FoodPage from './pages/Food/FoodPage.js';
import CartPage from './pages/Cart/CartPage.js';


// import AdvertisementForm from './components/AdvertisementForm';
// import UpdateAdvertisementForm from './components/UpdateAdvertisementForm';
// import AdvertisementPage  from './pages/AdvertisementPage'

import Login from './pages/login/Login';
import Signup from './pages/login/Signup';

import Mybookingstyle from './component/Mybookingstyle';

import Menu from './pages/Menu';
import AddfooditemsForm from './component/AddfooditemsForm';
import Restaurant from './pages/restaurant';
import AddrestaurantsForm from './component/AddrestaurantsForm';
import UpdateFoodItems from './component/updatefooditems';
import Updaterestaurants from './component/Updaterestaurants';
import RestaurantProfile from './pages/Restaurantprofile';
import UpdateRestaurantProfile from './component/UpdateRestaurantProfile'

import PrebookingDineInForm from './pages/prebookingdinein';

import RestaurantDashboard from './pages/restaurentDashbord/RestaurenrDashbord';


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

            <Route path="/mybookings/:id" element={<MyBookings />} />
           {/*} <Route path="/update-booking/:id" element={<UpdateBookingDetails />} />  */}
            <Route path="/update-pre-booking/:id" element={<UpdatePreBookings />} />
            <Route path="/update-dine-in-booking/:id" element={<UpdateDineIn />} />
            <Route path="/bookingpayment" element={<BookingPayment />} />

            {/* <Route path="/realtime-staff" element={<RestaurantStaff />} /> */}


            <Route path="/dine-in-form" element={<DineCustomerRegForm />} />
            <Route path="/pre-booking-dine-in-form" element={<PrebookingDineInForm />} />
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
            <Route path="/empleaves" element={<Empleaves />} />
            <Route path="/employeepaysalaries" element={<EmployeePaysalaries />} />

              
            <Route path="/respage/:id" element={<ResPage />} />
            <Route path="/search/:searchTerm" element={<ResPage />} />
            <Route path="/tag/:tag" element={<ResPage />} /> 
            <Route path="/food/:id" element={<FoodPage />} />
            <Route path="/cart" element={<CartPage/>} /> 


            <Route path='/riderdashborad/*' element={<RiderDashboard />}/>
            <Route path='/riderdashborad/ongoingorder' element={<OngoingOrder/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/payment' element={<Payment/>} />

            <Route path="/inventory/items" element={<Inventory />} />
            <Route path="/inventory/addItems" element={<ItemForm />} />
            <Route path="/inventory/update/:id" element={<UpdateUser />} />
            <Route path="/inventory/usage" element={<Usage />} /> 

            <Route path="/restaurant" element={<Mybookingstyle />} />

            <Route path="/fooditems" element = {<Menu />} />
            <Route path="/add-food-item" element = {<AddfooditemsForm />} />
            <Route path="/update-food-item/:id/" element = {<UpdateFoodItems/>} />
            <Route path="/restaurants" element = {<Restaurant />} />
            <Route path="/reslogin" element = {<Reglogin />} />
            <Route path='/restaurentDashbord' element={<RestaurantDashboard />} />
            <Route path="/addrestaurants" element = {<AddrestaurantsForm />} />
            <Route path="/update-restaurant/:id/" element = {<Updaterestaurants/>} />
            <Route path="/restaurants/:id/" element = {<RestaurantProfile />} />
            <Route path="/update-restaurantprofile/:id/" element = {<UpdateRestaurantProfile/>} />

          </Routes>
        </div>  
      </BrowserRouter>




    </div>
  );
}

export default App;