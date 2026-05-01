import { useState, useEffect } from "react"
import axios from "axios"

export default function App() {
  const [message, setMessage] = useState("Loading backend...")
  const [balance, setBalance] = useState(1200)

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Backend not connected"))
  }, [])

  return (
    <div style={styles.body}>
      
      {/* HEADER */}
      <h1 style={styles.title}>FOREXNOVA</h1>
      <p style={styles.subtitle}>{message}</p>

      {/* WALLET */}
      <div style={styles.cardGold}>
        <h2>Wallet Balance</h2>
        <h1>${balance}</h1>
      </div>

      {/* INVESTMENT PLANS */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>Starter Plan</h3>
          <p>10% ROI (7 Days)</p>
          <button style={styles.btn}>Invest $100</button>
        </div>

        <div style={styles.card}>
          <h3>Pro Plan</h3>
          <p>25% ROI (14 Days)</p>
          <button style={styles.btn}>Invest $500</button>
        </div>

        <div style={styles.card}>
          <h3>VIP Plan</h3>
          <p>50% ROI (30 Days)</p>
          <button style={styles.btn}>Invest $1000</button>
        </div>

      </div>

    </div>
  )
}

/* STYLES */
const styles = {
  body: {
    fontFamily: "Arial",
    background: "#0d0d0d",
    color: "white",
    minHeight: "100vh",
    padding: "30px"
  },
  title: {
    color: "#f5c542",
    fontSize: "40px"
  },
  subtitle: {
    color: "#aaa"
  },
  card: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },
  cardGold: {
    background: "linear-gradient(45deg, #b8860b, #f5c542)",
    padding: "20px",
    borderRadius: "10px",
    color: "black",
    marginTop: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "30px"
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#f5c542",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
}