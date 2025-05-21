import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homi from "./pages/Homi";
import Resources from "./pages/Resources";
import  Mentees  from "./pages/Mentees";
import { Registration } from "./pages/Registration";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import BookingPage from './pages/BookingPage'; 

import PaymentPage from "./pages/PaymentPage"; // ✅ Correct import
import Logout from "./pages/Logout";
import Navbar from "./Components/Navbar";
import { Error } from "./pages/Error";
import Footer from "./Components/footer";
import  Services  from "./pages/services";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homi />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/mentees" element={<Mentees />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* ✅ Dynamic booking route with mentee ID */}
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
