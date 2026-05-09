import { useState } from "react"

const CHATBOT_API_URL = process.env.REACT_APP_CHATBOT_API_URL || "https://chatbot-uz66.onrender.com"

function ChatModal({ isOpen, onClose }) {
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

  if (!isOpen) return null

  return (
    <div className="chatModalOverlay" onClick={onClose}>
      <div className="chatModal" onClick={(e) => e.stopPropagation()}>
        <div className="chatModalHeader">
          <h2>Herbal Chatbot</h2>
          <button className="closeButton" onClick={onClose}>×</button>
        </div>
        <div className="chatModalBody">
          <div className="chatInfo">
            <h3>How to use</h3>
            <ul>
              <li>Type a specific question such as "How is Tulsi used for immunity?"</li>
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

              {error && (
                <div className="message error">
                  <span className="messageLabel">Error</span>
                  <span>{error}</span>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatModal