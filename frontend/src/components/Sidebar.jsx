import { NavLink } from "react-router-dom"

export default function Sidebar({ user, onSignOut }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">FOREXNOVA</div>
        <p className="brand-tag">Trade smarter. Grow faster.</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Transactions
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Account
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span>Logged in as</span>
        <strong>{user?.email}</strong>
        <button className="button secondary" style={{ width: "100%" }} onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </aside>
  )
}
