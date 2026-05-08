import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Home from "./pages/home"
import Plants from "./pages/plants"
import Doctor from "./pages/doctor"
import Remedies from "./pages/remedies"
import Chatbot from "./pages/chatbot"
import Feedback from "./pages/feedback"
import Landing from "./pages/landing"

import ProtectedRoute from "./ProtectedRoute"
import ChatModal from "./components/ChatModal"
import { useState } from "react"

function App(){
  const [chatOpen, setChatOpen] = useState(false)

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />



        <Route
          path="/plants"
          element={
            <ProtectedRoute>
              <Plants />
            </ProtectedRoute>
          }
        />


        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          }
        />


        <Route
          path="/remedies"
          element={
            <ProtectedRoute>
              <Remedies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

      </Routes>

      <button onClick={() => setChatOpen(true)} className="chatBubble" aria-label="Open chatbot">
        Chat
      </button>

      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />

    </BrowserRouter>

  )

}

export default App