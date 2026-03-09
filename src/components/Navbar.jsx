import { Link, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Briefcase, Users, LayoutDashboard, Plus, MessageCircle, FileText } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/dashboard" className="navbar-brand">
                    <div className="logo-icon"><Zap size={18} color="white" /></div>
                    Acil İş
                </Link>

                <div className="navbar-nav">
                    <Link to="/dashboard" className="nav-link">
                        <LayoutDashboard size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Panel
                    </Link>
                    <Link to="/jobs" className="nav-link">
                        <Briefcase size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        İlanlar
                    </Link>
                    {user.role === 'employer' && (
                        <Link to="/workers" className="nav-link">
                            <Users size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                            Çalışanlar
                        </Link>
                    )}
                    <Link to="/offers" className="nav-link">
                        <FileText size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Teklifler
                    </Link>
                    <Link to="/chat" className="nav-link">
                        <MessageCircle size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Mesajlar
                    </Link>
                    {user.role === 'employer' && (
                        <Link to="/jobs/create" className="nav-link">
                            <Plus size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                            İlan Ver
                        </Link>
                    )}
                </div>

                <div className="navbar-actions">
                    <button className="btn btn-icon btn-ghost">
                        <Bell size={18} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'var(--primary-gradient)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, color: 'white'
                        }}>
                            {user.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{user.fullName}</span>
                    </div>
                    <button className="btn btn-icon btn-ghost" onClick={handleLogout} title="Çıkış Yap">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
