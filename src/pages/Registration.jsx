import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Registration = () => {
    const [user, setUser] = useState({
        "username":"",
        "email":"",
        "phone":"",
        "password":""
    });
    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth();
    const handleInput = (e) => {
        const { name, value } = e.target;
    
        // Update user state using the functional update form of setUser
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
             
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                


              // Call useAuth hook to get the auth function
                    storeTokenInLs(data.token);
                   
                
                // Reset the form fields after successful registration
                setUser({
                    "username": "",
                    "email": "",
                    "phone": "",
                    "password": ""
                });
               navigate("/Login");
            }
            else {
                alert(data.extraDetails);
            }
           
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/Regester.jpg" alt="register"
                                   height={1000} width={200} style={{ borderRadius: 5 }} 
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Register form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" 
                                            placeholder="Enter your username..." id="username" required autoComplete="off" 
                                            value={user.username} onChange={handleInput} /><br />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" 
                                            placeholder="Enter your email..." id="email" required autoComplete="off"
                                            value={user.email} onChange={handleInput} /><br />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="tel" name="phone" 
                                            placeholder="Enter your phone..." id="phone" required autoComplete="off"
                                            value={user.phone} onChange={handleInput} /><br />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" 
                                            placeholder="Enter your password..." id="password" required autoComplete="off"
                                            value={user.password} onChange={handleInput} /><br />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}
