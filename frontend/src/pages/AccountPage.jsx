export default function AccountPage({ user }) {
  return (
    <section>
      <div className="topbar">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Profile settings</h1>
        </div>
      </div>

      <section className="overview-grid">
        <article className="card summary-card">
          <span className="card-label">Email address</span>
          <h2>{user.email}</h2>
        </article>
        <article className="card summary-card">
          <span className="card-label">Current balance</span>
          <h2>${user.balance.toLocaleString()}</h2>
        </article>
      </section>

      <div className="card transactions-card">
        <div className="card-header">
          <h2>About your account</h2>
          <p>Use this page to review your current profile and balance.</p>
        </div>
        <p className="message">Your account is powered by FOREXNOVA backend services.</p>
      </div>
    </section>
  )
}
