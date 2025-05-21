import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams();
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMentee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching mentee:', err);
        setLoading(false);
      });
  }, [id]);

  const handleBookSession = async () => {
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menteeId: id }),
      });

      const data = await res.json();

      if (data.zoomLink) {
        setBookingConfirmed(true);
        window.open(data.zoomLink, '_blank');
      }
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!mentee) return <p className="text-center py-10">Mentee not found</p>;

  return (
    <section className="py-10 px-4 bg-white min-h-screen">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Book Session with {mentee.name}</h1>
        <img
          src={mentee.image || '/default-avatar.png'}
          alt={mentee.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-700 mb-2">🧠 {mentee.job_description}</p>
        <p className="text-gray-900 font-semibold mb-4">💰 ₹{mentee.price_per_hour}/hr</p>
        <button
          onClick={handleBookSession}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Book & Join Zoom Session
        </button>
        {bookingConfirmed && (
          <p className="mt-4 text-green-600 font-medium">Session booked! Zoom link opened in new tab.</p>
        )}
      </div>
    </section>
  );
};

export default PaymentPage;
