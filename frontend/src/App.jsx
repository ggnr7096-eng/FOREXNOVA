import { useEffect, useState } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import TransactionsPage from "./pages/TransactionsPage.jsx"
import AccountPage from "./pages/AccountPage.jsx"
import Sidebar from "./components/Sidebar.jsx"
import "./App.css"

const API_BASE = import.meta.env.
VITE_API_URL ?? "http://localhost:5000"

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("forexnova_token") || "")
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("forexnova_user")
    return stored ? JSON.parse(stored) : null
  })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem("forexnova_token", token)
    } else {
      localStorage.removeItem("forexnova_token")
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem("forexnova_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("forexnova_user")
    }
  }, [user])

  const signOut = () => {
    setUser(null)
    setToken("")
    setMessage("")
  }

  const invest = async (amount) => {
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post(
        `${API_BASE}/api/transactions/invest`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          balance: res.data.balance,
          transactions: res.data.transactions
        }))
        setMessage("Investment completed")
      } else {
        setMessage(res.data.message || "Investment failed")
      }
    } catch (error) {
      setMessage("Investment failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} setToken={setToken} />}
        />
        <Route element={<ProtectedLayout user={user} onSignOut={signOut} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <DashboardPage
                user={user}
                invest={invest}
                loading={loading}
                message={message}
              />
            }
          />
          <Route path="transactions" element={<TransactionsPage token={token} />} />
          <Route path="account" element={<AccountPage user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function ProtectedLayout({ user, onSignOut }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="dashboard-shell">
      <Sidebar user={user} onSignOut={onSignOut} />
      <main className="main-panel">
        <Outlet />
      </main>
    </div>
  )
}

export default App
