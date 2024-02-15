const BookingDetails = ( {booking} ) => {
    return (
        <div className="booking-details">
            <h4>{booking.date}</h4>
            <p><strong>Tables : </strong>{booking.quantity}</p>
            <p><strong>Time : </strong>{booking.time}</p>
            <p>{booking.createAt}</p>
        </div>
    )

}

export default BookingDetails