import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Mentees = () => {
  const [mentees, setMentees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/data') 
      .then((res) => res.json())
      .then((data) => setMentees(data))
      .catch((err) => console.error('Error fetching mentees:', err));
  }, []);

  const handleConnect = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <section className="py-10 px-4 bg-white min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Find Your Mentor</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentees.map((mentee) => {
            const { _id, name, job_description, price_per_hour, image } = mentee;
            return (
              <div
                key={_id}
                className="bg-gray-50 border rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={image || '/default-avatar.png'}
                  alt={name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-600 mb-2">{job_description}</p>
                <p className="text-blue-700 font-medium mb-4">₹{price_per_hour}/hr</p>
                <button
                  onClick={() => handleConnect(_id)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
                >
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