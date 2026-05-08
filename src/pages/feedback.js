import Navbar from "../components/navbar"
import "../css/style.css"
import { useState } from "react"

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

function Feedback(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
  const [loading, setLoading] = useState(false)


  const sendFeedback = async ()=>{

    if(!name || !email || !message){
      alert("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        "http://localhost:5000/addFeedback",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message
          })
        }
      )

      const data = await res.json()

      alert(data.msg)
      
      // Clear form on success
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      alert("Failed to send feedback. Please try again.")
    } finally {
      setLoading(false)
    }

  }



  return(

    <div>

      <Navbar />

      <div className="formBox">

        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </div>

        <h2>Share Your Feedback</h2>

        <p style={{ textAlign: 'center', marginBottom: '24px', fontSize: '14px' }}>
          We value your thoughts and suggestions. Help us improve HerbaLife for everyone.
        </p>

        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', display: 'block' }}>
          Your Name
        </label>
        <input
          placeholder="Enter your full name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', display: 'block' }}>
          Email Address
        </label>
        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', display: 'block' }}>
          Your Message
        </label>
        <textarea
          placeholder="Share your experience, suggestions, or any feedback..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          rows={5}
        />

        <button 
          onClick={sendFeedback}
          disabled={loading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          <SendIcon />
          {loading ? 'Sending...' : 'Send Feedback'}
        </button>

      </div>

    </div>

  )

}

export default Feedback
