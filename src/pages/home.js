import Navbar from "../components/navbar"
import "../css/style.css"
import { useNavigate } from "react-router-dom"

// Icon components for cleaner code
const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
)

const HeartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const MessageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const SparkleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
)

function Home(){

  const navigate = useNavigate()

  return(

    <div>

      <Navbar />


      {/* HERO */}

      <div className="hero">

        <div>

          <h1>Discover the Wisdom of Natural Healing</h1>

          <p>
            Your trusted companion for exploring medicinal plants,
            connecting with expert practitioners, and embracing holistic wellness
            through time-tested natural remedies.
          </p>

          <button
            className="btn"
            onClick={()=>navigate("/plants")}
          >
            Search Plants
          </button>

        </div>

      </div>



      {/* STATS */}

      <div className="stats">

        <div className="box">
          <h2>15+</h2>
          <p>Medicinal Plants</p>
        </div>

        <div className="box">
          <h2>6+</h2>
          <p>Expert Doctors</p>
        </div>

        <div className="box">
          <h2>12+</h2>
          <p>Natural Remedies</p>
        </div>

        <div className="box">
          <h2>10K+</h2>
          <p>Happy Users</p>
        </div>

      </div>



      {/* SERVICES */}

      <h2 className="title">Explore Our Services</h2>

      <div className="services">

        <div
          className="card"
          onClick={()=>navigate("/plants")}
        >
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <LeafIcon />
          </div>
          <h3>Medicinal Plants Database</h3>
          <p>Explore our comprehensive collection of healing herbs and plants with detailed benefits and usage guides.</p>
        </div>


        <div
          className="card"
          onClick={()=>navigate("/doctor")}
        >
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <UserIcon />
          </div>
          <h3>Consult Experts</h3>
          <p>Connect with certified herbal medicine practitioners and naturopathic doctors for personalized guidance.</p>
        </div>


        <div
          className="card"
          onClick={()=>navigate("/remedies")}
        >
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <HeartIcon />
          </div>
          <h3>Home Remedies</h3>
          <p>Discover traditional natural treatments passed down through generations for common ailments.</p>
        </div>


        <div
          className="card"
          onClick={()=>navigate("/feedback")}
        >
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <MessageIcon />
          </div>
          <h3>Share Feedback</h3>
          <p>Help us improve by sharing your experience and suggestions with our community.</p>
        </div>

      </div>



      {/* WHY */}

      <h2 className="title">Why Choose HerbaLife?</h2>

      <div className="services">

        <div className="card">
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <ShieldIcon />
          </div>
          <h3>Authentic Knowledge</h3>
          <p>Verified information sourced from traditional medicine texts and modern scientific research.</p>
        </div>

        <div className="card">
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <StarIcon />
          </div>
          <h3>Expert Support</h3>
          <p>Access to qualified practitioners who combine ancient wisdom with contemporary practice.</p>
        </div>

        <div className="card">
          <div style={{ color: '#1a4d2e', marginBottom: '16px' }}>
            <SparkleIcon />
          </div>
          <h3>Natural Solutions</h3>
          <p>Safe, sustainable remedies that work in harmony with your body for lasting wellness.</p>
        </div>

      </div>



      {/* BOTTOM */}

      <div className="bottom">

        <h2>Start Your Natural Wellness Journey</h2>

        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '28px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Join thousands of people who have discovered the healing power of nature.
        </p>

        <button
          className="btn"
          onClick={()=>navigate("/plants")}
        >
          Browse Plants
        </button>

        <button
          className="btn2"
          onClick={()=>navigate("/doctor")}
        >
          Consult Doctor
        </button>

      </div>


    </div>

  )

}

export default Home
