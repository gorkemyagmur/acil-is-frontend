import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import CreateJobPage from './pages/CreateJobPage'
import WorkersPage from './pages/WorkersPage'
import DashboardPage from './pages/DashboardPage'
import OffersPage from './pages/OffersPage'
import ChatPage from './pages/ChatPage'

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
        }
    }, [])

    const handleLogin = (userData, accessToken) => {
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('accessToken', accessToken)
        setUser(userData)
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        setUser(null)
    }

    return (
        <BrowserRouter>
            {user && <Navbar user={user} onLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage onLogin={handleLogin} />} />
                <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/" />} />
                <Route path="/jobs" element={user ? <JobsPage user={user} /> : <Navigate to="/login" />} />
                <Route path="/jobs/create" element={user ? <CreateJobPage user={user} /> : <Navigate to="/login" />} />
                <Route path="/jobs/:id" element={user ? <JobDetailPage user={user} /> : <Navigate to="/login" />} />
                <Route path="/workers" element={user ? <WorkersPage user={user} /> : <Navigate to="/login" />} />
                <Route path="/offers" element={user ? <OffersPage user={user} /> : <Navigate to="/login" />} />
                <Route path="/chat" element={user ? <ChatPage user={user} /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
