import Navbar from "../components/navbar"
import { useState } from "react"

const CHATBOT_API_URL = process.env.REACT_APP_CHATBOT_API_URL || "https://chatbot-uz66.onrender.com"

function Chatbot() {
  const [query, setQuery] = useState("")
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const sendMessage = async () => {
    const trimmed = query.trim()
    if (!trimmed) return

    const userMessage = { role: 'user', text: trimmed }
    const updatedHistory = [...history, userMessage]
    setHistory(updatedHistory)
    setQuery("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: trimmed,
          context: updatedHistory.map((message) => `${message.role}: ${message.text}`),
        }),
      })

      if (!response.ok) {
        throw new Error('Chatbot request failed')
      }

      const data = await response.json()
      setHistory((prev) => [...prev, { role: 'bot', text: data.response }])
    } catch (err) {
      setError('Unable to connect to the chatbot backend. Please make sure the Flask server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div>
      <Navbar />

      <div className="page chatPage">
        <div className="chatHeader">
          <div>
            <h1>Herbal Chatbot</h1>
            <p className="chatDescription">
              Ask questions about medicinal plants, remedies, benefits, and practical uses. Responses are served from the live chatbot API at <strong>{CHATBOT_API_URL}/chat</strong>.
            </p>
          </div>
        </div>

        <div className="chatContainer">
          <div className="chatInfo">
            <h2>How to use</h2>
            <ul>
              <li>Type a specific question such as “How is Tulsi used for immunity?”</li>
              <li>Press Enter or click Send to get a short, medicinal plant focused answer.</li>
              <li>The chatbot is designed to stay practical and avoid filler text.</li>
            </ul>
          </div>

          <div className="chatWindow">
            <div className="messages">
              {history.length === 0 && (
                <p className="chatStatus">Your conversation will appear here.</p>
              )}

              {history.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <span className="messageLabel">{message.role === 'user' ? 'You' : 'Bot'}</span>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>

            <div className="chatInputArea">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Tulsi, Neem, remedies, benefits, or plant usage..."
              />
              <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {error && <p className="chatStatus chatError">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
