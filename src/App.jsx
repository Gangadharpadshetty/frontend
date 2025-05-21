import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homi from "./pages/Homi";
import Resources from "./pages/Resources";
import { Mentees } from "./pages/Mentees";
import { Registration } from "./pages/Registration";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { BookingPage} from "./pages/BookingPage";
import Logout from "./pages/Logout";
import Navbar from "./Components/Navbar";
import { Error } from "./pages/Error";
import Footer from "./Components/footer";
import { Services } from "./pages/services";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homi />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Mentees" element={<Mentees />} />
        <Route path="/Registration" element={<Registration />} />
        {/* <Route path="/service" element={<Services />} /> */}
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/booking/:mentorId" element={<BookingPage />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
