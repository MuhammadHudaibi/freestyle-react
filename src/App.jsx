import './App.css'

function App() {
  const message = "I Love You, Sayang"

  return (
    <div className="love-container">
      <h1 className="love-message" aria-label={message}>
        {message.split('').map((char, index) => (
          <span
            key={index}
            style={{
              animationDelay: `${index * 0.1}s, ${index * 0.15}s`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default App