import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

const defaultContactForm = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactForm);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setContact(prevState => ({
                ...prevState,
                username: user.username,
                email: user.email,
            }));
        }
    }, [user]); // Include user in the dependency array

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', contact);

        try {
            const response = await fetch('http://localhost:8000/api/form/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact),
            });
            if (response.ok) {
                setContact(defaultContactForm);
                const data = await response.json();
                console.log(data);
                alert("Message sent successfully");
            } else {
                alert("Could not send form submission");
            }
        } catch (error) {
            console.log("Message did not send");
            console.log("Error is", error);
        }
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <div className="">
                        <img src="images/ai.jpg" alt="We are always ready to help you" />
                    </div>
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    cols="30"
                                    rows="8"
                                ></textarea>
                            </div>

                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    );
};
