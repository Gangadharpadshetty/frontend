import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mentees.css";

const Mentees = () => {
  const [mentees, setMentees] = useState([]);
  const navigate = useNavigate();

  const images = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
  ];

  const roleSpecializations = {
    developer: "Software Development",
    designer: "UI/UX Design",
    manager: "Project Management",
    marketer: "Digital Marketing",
    analyst: "Data Analysis",
  };

  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

  const getSpecialization = (role) => roleSpecializations[role] || "Generalist";

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/data/mentees");
        const json = await res.json();
        if (json.success) {
          setMentees(json.data);
        } else {
          console.error("Failed to fetch mentees:", json.message);
        }
      } catch (err) {
        console.error("Error fetching mentees:", err);
      }
    };
    fetchMentees();
  }, []);

  const handleConnect = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <section className="mentees-section">
      <div className="container">
        <h1 className="title">Find Your Mentor</h1>
        <div className="mentee-grid">
          {mentees.map((mentee) => {
            const { _id, name, job_description, price_per_hour, role } = mentee;
            const image = getRandomImage();
            const specialization = getSpecialization(role);
            const rating = getRandomRating();

            return (
              <div key={_id} className="mentee-card">
                <img src={image} alt={name} className="mentee-image" />
                <h2 className="mentee-name">{name}</h2>
                <p className="mentee-desc">{job_description}</p>
                <p className="mentee-specialization">{specialization}</p>
                <p className="mentee-price">₹{price_per_hour}/hr</p>
                <div className="mentee-rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={index < rating ? "filled" : ""}>
                      ★
                    </span>
                  ))}
                </div>
                <button onClick={() => handleConnect(_id)} className="connect-btn">
                  Connect
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mentees;
