import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingPage.css';

export const BookingPage = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/mentors/${mentorId}`)
      .then(res => res.json())
      .then(data => setMentor(data))
      .catch(err => console.error(err));
  }, [mentorId]);

  const handleBook = () => {
    const datetime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    datetime.setHours(hours);
    datetime.setMinutes(minutes);

    const bookingData = {
      mentorId,
      datetime: datetime.toISOString()
    };

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setBookingSuccess(true);
    })
    .catch(err => console.error(err));
  };

  if (!mentor) return <p>Loading mentor details...</p>;

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>{mentor.name}</h2>
        <p><strong>Expertise:</strong> {mentor.expertise}</p>
        <p><strong>Experience:</strong> {mentor.experience} years</p>
        <p><strong>Email:</strong> {mentor.email}</p>

        <div className="form-group">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            minDate={new Date()}
          />
        </div>

        <div className="form-group">
          <label>Select Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="time-input"
          />
        </div>

        <button onClick={handleBook} className="book-button">Book Meeting</button>

        {bookingSuccess && <p className="success-message">Booking successful! Zoom link will be emailed.</p>}
      </div>
    </div>
  );
};


