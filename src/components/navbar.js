import { Link } from "react-router-dom"
import "../css/style.css"
import { useState, useEffect } from "react"

const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

function Navbar(){

  const [show, setShow] = useState(false)
  const [signup, setSignup] = useState(false)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [user,setUser] = useState(null)


  // LOAD SESSION

  useEffect(()=>{

    const u = localStorage.getItem("user")

    if(u){

      setUser(u)

    }

  },[])



  // SIGNUP

  const signupUser = async ()=>{
    try {
      const res = await fetch(
        "http://localhost:5000/signup",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await res.json()

      alert(data.msg)
    } catch (error) {
      console.error("Signup failed:", error)
      alert("Signup failed. Please try again.")
    }
  }



  // LOGIN

  const loginUser = async ()=>{
    try {
      const res = await fetch(
        "http://localhost:5000/login",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await res.json()

      if(data.msg === "ok"){

        localStorage.setItem("user", email)

        setUser(email)

        setShow(false)   // CLOSE POPUP

      }else{

        alert("Wrong login")

      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please try again.")
    }
  }



  // LOGOUT

  const logout = ()=>{

    localStorage.removeItem("user")

    setUser(null)

  }



  return(

    <div>

      {/* NAVBAR */}

      <div className="navbar">

        <div className="logo">
          <LeafIcon />
          <h2>Digital Herbal Garden</h2>
        </div>


        <div className="menu">

          <Link to="/home">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/doctor">Doctor</Link>
          <Link to="/remedies">Remedies</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/feedback">Feedback</Link>

        </div>



        {/* RIGHT SIDE */}

        {!user && (

          <button
            className="loginBtn"
            onClick={()=>{
              setShow(true)
              setSignup(false)
            }}
          >
            Login
          </button>

        )}



        {user && (

          <div>

            <span>{user}</span>

            <button onClick={logout}>
              Logout
            </button>

          </div>

        )}


      </div>



      {/* POPUP */}

      {show && (

        <div className="modal">

          <div className="modalBox">


            {/* LOGIN */}

            {!signup && (

              <div>

                <h2>Welcome Back</h2>

                <input
                  placeholder="Email address"
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <button onClick={loginUser}>
                  Sign In
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                  {"Don't have an account?"}
                  <span
                    onClick={()=>setSignup(true)}
                  >
                    Sign Up
                  </span>
                </p>

              </div>

            )}



            {/* SIGNUP */}

            {signup && (

              <div>

                <h2>Create Account</h2>

                <input
                  placeholder="Full name"
                  onChange={(e)=>setName(e.target.value)}
                />

                <input
                  placeholder="Email address"
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <button onClick={signupUser}>
                  Create Account
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                  Already have an account?
                  <span
                    onClick={()=>setSignup(false)}
                  >
                    Sign In
                  </span>
                </p>

              </div>

            )}


            <button onClick={()=>setShow(false)}>
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default Navbar
