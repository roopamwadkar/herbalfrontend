import "../css/style.css"
import { useNavigate } from "react-router-dom"

function Landing(){

  const nav = useNavigate()

  return(

    <div className="landing">

      <div className="landingBox">

        {/* Leaf Icon */}
        <svg 
          width="60" 
          height="60" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#1a4d2e" 
          strokeWidth="1.5"
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ marginBottom: '24px' }}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>

        <h1>Digital Herbal Garden</h1>

        <h3>Discover the Healing Power of Nature</h3>

        <p>
          Your trusted guide to medicinal plants,
          expert consultations, and natural remedies for holistic wellness.
        </p>

        <button onClick={()=>nav("/home")}>
          Explore Now
        </button>

      </div>



      <div className="landingCards">

        <div className="lcard">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <div>Medicinal Plants Database</div>
        </div>

        <div className="lcard">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
          <div>Expert Consultation</div>
        </div>

        <div className="lcard">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div>Natural Remedies</div>
        </div>

      </div>


    </div>

  )

}

export default Landing
