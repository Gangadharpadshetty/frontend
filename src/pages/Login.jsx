import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify'; 

export  const Login=()=> {


    const [user, setUser] = useState({
       
        email:"",
        phone:"",
 
    });
    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth();
    //handling the input values
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
        console.log('user')
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
           
            const data = await response.json();
            console.log(data.message);
            // Call useAuth hook to get the auth function
                if (response.ok) {
                
                    toast.success("Login successfull");
                    storeTokenInLs(data.token); // Call the auth function with the token

    
                    // Reset the form fields after successful registration
                    setUser({
                       
                        "email": "",
                       
                        "password": ""
                    });
                   navigate("/");
                }
                else
                {
                    toast.error(data.extraDetails);
                }
            
        } catch (error) {
            console.log("message", error);
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
                                <h1 className="main-heading mb-3">Login form</h1>
                                <br />
                                <form  onSubmit={handleSubmit}>
                                   
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" 
                                            placeholder="Enter your email..." id="email" required autoComplete="off"
                                            value={user.email} onChange={handleInput} /><br />
                                    </div>
                                  
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" 
                                            placeholder="Enter your password..." id="password" required autoComplete="off"
                                            value={user.password} onChange={handleInput} /><br />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

