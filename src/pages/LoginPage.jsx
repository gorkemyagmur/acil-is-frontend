import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Zap } from 'lucide-react'
import { api } from '../services/api'

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await api.login(form)
            onLogin(res.user, res.accessToken)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Giriş başarısız')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card animate-in">
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Link to="/" className="navbar-brand" style={{ justifyContent: 'center' }}>
                        <div className="logo-icon"><Zap size={18} color="white" /></div>
                        Acil İş
                    </Link>
                </div>
                <h1>Tekrar Hoş Geldin</h1>
                <p className="subtitle">Hesabına giriş yap ve hemen başla</p>

                {error && (
                    <div style={{
                        padding: '12px 16px', borderRadius: 'var(--radius-md)',
                        background: 'var(--danger-light)', color: '#991B1B',
                        fontSize: '0.85rem', marginBottom: 16
                    }}>{error}</div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label><Mail size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />E-posta</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="ornek@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label><Lock size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Şifre</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                        <LogIn size={18} />
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>

                <div className="auth-footer">
                    Hesabın yok mu? <Link to="/register">Ücretsiz Kayıt Ol</Link>
                </div>
            </div>
        </div>
    )
}
