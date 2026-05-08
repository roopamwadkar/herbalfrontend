import Navbar from "../components/navbar"
import "../css/style.css"
import { useState, useEffect } from "react"

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
)

const AwardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

function Doctor(){

  const [data, setData] = useState([])


  // GET FROM BACKEND

  useEffect(()=>{

    fetch("http://localhost:5000/doctors")
      .then(res => res.json())
      .then(d => setData(d))

  },[])



  return(

    <div>

      <Navbar />

      <div className="page">

        <h1>Our Expert Practitioners</h1>

        <p style={{ marginBottom: '32px', maxWidth: '600px' }}>
          Connect with certified herbal medicine practitioners and naturopathic doctors 
          who combine traditional wisdom with modern medical knowledge.
        </p>


        <div className="doctorContainer">

          {data.length === 0 && (
            <p style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
              Loading doctors...
            </p>
          )}

          {data.map((d,i)=>(

            <div key={i} className="doctorCard">

              <img src={d.img} alt={d.name} />

              <h3>{d.name}</h3>

              <p style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: '#d8f3dc',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#1a4d2e',
                margin: '8px 20px'
              }}>
                <AwardIcon />
                {d.specialization}
              </p>

              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <BriefcaseIcon />
                <span style={{ color: '#1a1a1a' }}>{d.experience} Experience</span>
              </p>

              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneIcon />
                <span style={{ color: '#1a1a1a' }}>{d.phone}</span>
              </p>

              <button>
                Book Consultation
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default Doctor
