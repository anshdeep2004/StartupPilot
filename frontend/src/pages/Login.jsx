import React from 'react'
import { useNavigate } from 'react-router-dom'

const CREDENTIALS = [
  { username: 'alice', password: 'password123', displayName: 'Alice' },
  { username: 'bob', password: 'qwerty123', displayName: 'Bob' },
  { username: 'carol', password: 'letmein', displayName: 'Carol' }
]

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  // no persistent auth for now — login simply navigates to dashboard on success

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const found = CREDENTIALS.find(c => c.username === username && c.password === password)
    if (!found) {
      setError('Invalid username or password')
      return
    }
  // set a short-lived session flag so the app shows the dashboard after login
  try { sessionStorage.setItem('sp_logged_in', '1') } catch { /* ignore */ }
  try { window.dispatchEvent(new Event('sp-login')) } catch { /* ignore */ }
  navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3e8ff] via-[#f7eefb] to-[#eaf6ff] p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-sm text-gray-600 mb-6">Sign in to access your StartupPilot dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="alice" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-300" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white font-semibold shadow">Sign in</button>
            <button type="button" onClick={() => { setUsername(''); setPassword(''); setError('') }} className="text-sm text-gray-500">Clear</button>
          </div>
        </form>

        <div className="mt-6 text-xs text-gray-500">
          <p>Test accounts (demo):</p>
          <ul className="list-disc ml-5">
            <li>alice / password123</li>
            <li>bob / qwerty123</li>
            <li>carol / letmein</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
