import React from "react";
import "./BookingPage.css";

function BookingPage() {
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: 559900, // amount in paise (₹5599.00)
      currency: "INR",
      name: "GetPlaced",
      description: "Mentorship Booking",
      image: "https://yourlogo.png", // optional logo
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        // Optional: Send this response to your backend for verification
      },
      prefill: {
        name: "John Doe", // You can dynamically fill these
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        mentor_id: "12345",
        session_time: "2025-04-20 18:00",
      },
      theme: {
        color: "#3ab757",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="booking-container">
      <div className="left-panel">
        <h2>1-on-1 Mentorship Session</h2>
        <p>Book a 30-minute Zoom call with an expert mentor.</p>
      </div>
      <div className="right-panel">
        <h3>Payment Details</h3>
        <div className="price-row">
          <span>Session</span>
          <span>₹5000</span>
        </div>
        <div className="price-row">
          <span>Add-on</span>
          <span>₹599</span>
        </div>
        <div className="total">Total: ₹5599</div>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone" required />
        <button onClick={handlePayment}>Pay ₹5599</button>
      </div>
    </div>
  );
}

export default BookingPage;
