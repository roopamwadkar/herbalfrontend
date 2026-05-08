import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user")

  if (!user) {

    alert("Please login first")

    return <Navigate to="/home" />

  }

  return children
}

export default ProtectedRoute