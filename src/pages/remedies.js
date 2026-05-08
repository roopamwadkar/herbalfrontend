import Navbar from "../components/navbar"
import "../css/style.css"
import { useState, useEffect } from "react"

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
)

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

function Remedies(){

  const [data, setData] = useState([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")


  // GET FROM BACKEND

  useEffect(()=>{

    fetch("http://localhost:5000/remedies")
      .then(res => res.json())
      .then(d => {
        if (Array.isArray(d)) {
          setData(d)
        } else {
          console.error("Remedies data is not an array:", d)
          setData([])
        }
      })
      .catch(error => {
        console.error("Failed to fetch remedies:", error)
        setData([])
      })

  },[])



  // FILTER

  const filtered = data.filter((r)=>{

    const s =
      r.name.toLowerCase().includes(search.toLowerCase())

    const c =
      category === "All" || r.type === category

    return s && c

  })


  const categories = ["All", "Cold", "Skin", "Immunity", "Digestive"]


  return(

    <div>

      <Navbar />

      <div className="page">

        <h1>Natural Home Remedies</h1>

        <p style={{ marginBottom: '24px', maxWidth: '600px' }}>
          Discover traditional natural treatments passed down through generations. 
          These time-tested remedies use common ingredients for everyday wellness.
        </p>


        {/* SEARCH */}

        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <input
            className="searchBox"
            placeholder="Search remedies..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{ paddingLeft: '48px' }}
          />
          <div style={{ 
            position: 'absolute', 
            left: '16px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#6b6b6b'
          }}>
            <SearchIcon />
          </div>
        </div>


        {/* CATEGORY */}

        <div className="category">

          {categories.map((cat) => (
            <button 
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={()=>setCategory(cat)}
            >
              {cat}
            </button>
          ))}

        </div>



        {/* CARDS */}

        <div className="remedyContainer">

          {filtered.length === 0 && (
            <p style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
              No remedies found matching your search criteria.
            </p>
          )}

          {filtered.map((r,i)=>(

            <div key={i} className="remedyCard">

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <h3>{r.name}</h3>
                <span style={{
                  padding: '4px 12px',
                  background: '#d8f3dc',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1a4d2e'
                }}>
                  {r.type}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '10px',
                marginBottom: '12px',
                color: '#6b6b6b'
              }}>
                <LeafIcon />
                <div>
                  <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '13px' }}>Ingredients</span>
                  <p style={{ margin: 0, fontSize: '14px' }}>{r.ingredients}</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '10px',
                marginBottom: '12px',
                color: '#6b6b6b'
              }}>
                <ListIcon />
                <div>
                  <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '13px' }}>Steps</span>
                  <p style={{ margin: 0, fontSize: '14px' }}>{r.steps}</p>
                </div>
              </div>

              <div className="benefit" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HeartIcon />
                <span>{r.benefit}</span>
              </div>

            </div>

          ))}

        </div>


      </div>

    </div>

  )

}

export default Remedies
