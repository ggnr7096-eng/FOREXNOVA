import { useState } from "react"

export default function DashboardPage({ user, invest, loading, message }) {
  const [amount, setAmount] = useState(1000)

  return (
    <>
      <div className="topbar">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      <section className="overview-grid">
        <article className="card summary-card">
          <span className="card-label">Current balance</span>
          <h2>${user.balance.toLocaleString()}</h2>
        </article>
        <article className="card summary-card">
          <span className="card-label">Account email</span>
          <h2>{user.email}</h2>
        </article>
        <article className="card summary-card">
          <span className="card-label">Quick action</span>
          <button
            className="button primary"
            onClick={() => invest(1000)}
            disabled={loading}
          >
            Invest $1,000
          </button>
        </article>
      </section>

      <section className="dashboard-row">
        <section className="card invest-card">
          <div className="card-header">
            <h2>Invest funds</h2>
            <p>Type an amount and push it into your portfolio.</p>
          </div>

          <div className="form-row">
            <input
              type="number"
              min={100}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input"
            />
            <button
              className="button primary"
              onClick={() => invest(amount)}
              disabled={loading || amount <= 0}
            >
              Invest now
            </button>
          </div>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="card transactions-card">
          <div className="card-header">
            <h2>Recent activity</h2>
            <p>Latest portfolio actions appear here.</p>
          </div>

          <div className="transactions-list">
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.slice(-5).reverse().map((tx, index) => (
                <div key={index} className="transaction-row">
                  <div>
                    <strong>{tx.type}</strong>
                    <p>${tx.amount.toLocaleString()}</p>
                  </div>
                  <span className="status-tag">{tx.status}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">No transactions yet.</div>
            )}
          </div>
        </section>
      </section>
    </>
  )
}
