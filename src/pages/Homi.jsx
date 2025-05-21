import React from 'react'
import { useAuth } from '../store/auth'

function Homi() {
  const { user } = useAuth();
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>hi {user}</h1> {/* Use optional chaining to safely access user's email */}
              <h1>Welcome to StudyMentorHub:</h1>
              <p>Your Path to Academic Excellence</p>
              <p>Unlock your full potential and achieve academic success with StudyMentorHub. We offer personalized guidance, comprehensive study resources, and one-on-one mentorship opportunities to help you excel in your academic journey.</p>
              <hr className="line-between" /> {/* Styled line between paragraphs */}
              <p>Join our vibrant community today and embark on a transformative learning experience. Let's learn, grow, and succeed together!</p>
              <div className="btn btn-group">
                <a href="/Contact"><button className='btn'>Connect now</button></a> {/* Use forward slash for href */}
              </div>
            </div>
            {/* menteesapp */}
            {/* hero images */}
            <div className="hero-image">
              <img src="/images/ment0.png" alt="welcome to home page" width="400" height="500"/>
            </div>
          </div>
        </section>
        <section className="section-analytics">
          <div className="container grid grid-four-cols">
            <div className='div1'>
              <h1>50K+</h1>
              <p>Registered students</p>
            </div>
            <div className="div1">
              <h1>100+</h1>
              <p>Mentees</p>
            </div>
            <div className="div1">
              <h1>Learn wisely</h1>
            </div>
            <div className="div1">
              <h1>Best Strategies</h1> {/* Corrected spelling of Strategies */}
              <p>to learn</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Homi
