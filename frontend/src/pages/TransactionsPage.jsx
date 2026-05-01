import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

export default function TransactionsPage({ token }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(`${API_BASE}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (res.data.success) {
          setTransactions(res.data.transactions || [])
        } else {
          setError(res.data.message || "Unable to load transactions")
        }
      } catch (err) {
        setError("Unable to load transactions")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [token])

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <section>
      <div className="topbar">
        <div>
          <p className="eyebrow">Transactions</p>
          <h1>Transaction history</h1>
        </div>
      </div>

      <div className="card transactions-card">
        <div className="card-header">
          <p>Every investment history item is shown in the list below.</p>
        </div>

        {loading ? (
          <p className="message">Loading transactions…</p>
        ) : error ? (
          <p className="message">{error}</p>
        ) : transactions.length === 0 ? (
          <div className="empty-state">No transactions found.</div>
        ) : (
          <div className="transactions-list">
            {transactions.slice().reverse().map((tx, index) => (
              <div key={index} className="transaction-row">
                <div>
                  <strong>{tx.type}</strong>
                  <p>${tx.amount.toLocaleString()}</p>
                </div>
                <span className="status-tag">{tx.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
