import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>The Booking Page</h1>
            <div className="links">
                <Link to="/">New Booking</Link>
                <Link to="/myBookings">My Bookings</Link>
                <Link to="/realtime-staff">Real time Bookings</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;