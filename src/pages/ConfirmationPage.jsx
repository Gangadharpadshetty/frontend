// pages/ConfirmationPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const { state } = useLocation();

  if (!state?.zoomLink) return <p>No Zoom link found.</p>;

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed 🎉</h1>
      <p>Your Zoom session is ready. Click below to join:</p>
      <a
        href={state.zoomLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-4 inline-block"
      >
        Join Zoom Session
      </a>
    </div>
  );
};

export default ConfirmationPage;
