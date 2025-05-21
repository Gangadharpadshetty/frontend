// pages/BookSession.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { loadRazorpay } from "../utils/razorpay";

const BookSession = () => {
  const { menteeId } = useParams();
  const [mentee, setMentee] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/mentees/${menteeId}`).then((res) => {
      setMentee(res.data);
    });
  }, [menteeId]);

  const handlePayment = async () => {
    if (!selectedTime) return alert("Please select a time");

    setLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/create-payment", {
        menteeId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "GetPlaced Session",
        description: `Booking session with ${mentee.name}`,
        order_id: data.order.id,
        handler: async function (response) {
          const bookingRes = await axios.post("/api/bookings/book-session", {
            menteeId,
            userName: localStorage.getItem("userName") || "Guest",
            userEmail: localStorage.getItem("userEmail") || "guest@email.com",
            selectedTime,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          });

          alert("Booking Confirmed! Zoom Link: " + bookingRes.data.zoomLink);
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  if (!mentee) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-2">Book a Session with {mentee.name}</h2>
      <p className="text-gray-500 mb-4">{mentee.job_description}</p>
      <img src={mentee.image} alt="" className="w-32 h-32 rounded-full mb-4" />
      <label className="block text-sm font-medium">Select Time</label>
      <input
        type="datetime-local"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="block w-full border p-2 rounded mt-2 mb-4"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
      >
        {loading ? "Processing..." : `Pay ₹${mentee.price_per_hour} & Book`}
      </button>
    </div>
  );
};

export default BookSession;