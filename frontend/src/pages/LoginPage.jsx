import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

export default function LoginPage({ user, setUser, setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true })
    }
  }, [user, navigate])

  const login = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password
      })

      if (res.data.success) {
        setUser(res.data.user)
        setToken(res.data.token)
        navigate("/dashboard", { replace: true })
      } else {
        setMessage(res.data.message || "Login failed")
      }
    } catch (error) {
      setMessage("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        email,
        password
      })

      if (res.data.success) {
        setUser(res.data.user)
        setToken(res.data.token)
        navigate("/dashboard", { replace: true })
      } else {
        setMessage(res.data.message || "Registration failed")
      }
    } catch (error) {
      setMessage("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <p className="eyebrow">FOREXNOVA</p>
            <h1>Access your dashboard</h1>
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter your password"
          />
        </div>

        <div className="auth-actions">
          <button className="button primary" onClick={login} disabled={loading}>
            Login
          </button>
          <button className="button secondary" onClick={register} disabled={loading}>
            Register
          </button>
        </div>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  )
}
