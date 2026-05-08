import Navbar from "../components/navbar"
import "../css/style.css"
import { useState, useEffect } from "react"

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

function Plants(){

  const [plantsData, setPlantsData] = useState([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selected, setSelected] = useState(null)



  // GET FROM BACKEND

  useEffect(()=>{

    fetch("http://localhost:5000/plants")
      .then(res => res.json())
      .then(data => setPlantsData(data))

  },[])



  // FILTER

  const filtered = plantsData.filter((p)=>{

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase())

    const matchCategory =
      category === "All" || p.type === category

    return matchSearch && matchCategory

  })


  const categories = ["All", "Immunity", "Skin", "Digestion", "Stress", "Brain", "Respiratory"]


  return(

    <div>

      <Navbar />

      <div className="page">

        <h1>Medicinal Plants Database</h1>

        <p style={{ marginBottom: '24px', maxWidth: '600px' }}>
          Explore our comprehensive collection of healing herbs and plants. 
          Each entry includes detailed information about benefits, usage, and traditional applications.
        </p>


        {/* SEARCH */}

        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <input
            className="searchBox"
            placeholder="Search plants by name..."
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


        {/* PLANTS */}

        <div className="plantContainer">

          {filtered.length === 0 && (
            <p style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
              No plants found matching your search criteria.
            </p>
          )}

          {filtered.map((p,i)=>(

            <div
              className="plantCard"
              key={i}
              onClick={()=>setSelected(p)}
            >

              <img src={p.img} alt={p.name} />

              <h3>{p.name}</h3>

              <p>{p.type}</p>

            </div>

          ))}

        </div>


        {/* MODAL */}

        {selected && (

          <div className="modal" onClick={()=>setSelected(null)}>

            <div className="modalBox" onClick={(e)=>e.stopPropagation()}>

              <h2>{selected.name}</h2>

              <img src={selected.img} alt={selected.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available'; }} />

              <div style={{ 
                display: 'inline-block',
                padding: '6px 14px', 
                background: '#d8f3dc', 
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#1a4d2e',
                marginBottom: '16px'
              }}>
                {selected.type}
              </div>

              <p><strong>Scientific Name:</strong> {selected.scientific_name}</p>

              <p><strong>Description:</strong> {selected.desc}</p>

              <p><strong>Usage:</strong> {selected.usage}</p>

              <p><strong>Benefits:</strong> {selected.benefits}</p>

              <button onClick={()=>setSelected(null)}>
                Close
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  )

}

export default Plants
