import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    setBookingData(data);
  }, []);

  const handlePayment = async () => {
    if (!bookingData) return;

    // STEP 1: Call backend to create Razorpay order
    const orderResponse = await fetch("http://localhost:5000/api/bookings/create-payment-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ menteeId: bookingData.menteeId }),
    });

    const { order } = await orderResponse.json();

    // STEP 2: Launch Razorpay payment window
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "GetPlaced Mentorship",
      description: "Session Booking",
      order_id: order.id,
      handler: async function (response) {
        // STEP 3: On successful payment, call backend to save booking + Zoom
        const res = await fetch("http://localhost:5000/api/bookings/book-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingData,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          }),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Booking successful! Zoom Link: " + result.zoomLink);
          navigate("/");
        } else {
          alert("Booking failed");
        }
      },
      prefill: {
        name: bookingData.userName,
        email: bookingData.userEmail,
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!bookingData) return <p>Loading booking details...</p>;

  return (
    <div className="container">
      <h2>Complete Your Payment</h2>
      <p>
        You're booking a session with mentor ID <b>{bookingData.menteeId}</b>
      </p>
      <p>Name: {bookingData.userName}</p>
      <p>Email: {bookingData.userEmail}</p>
      <p>Time: {new Date(bookingData.selectedTime).toLocaleString()}</p>

      <button className="button" onClick={handlePayment}>
        Pay Now via Razorpay
      </button>
    </div>
  );
}

export default PaymentPage;
