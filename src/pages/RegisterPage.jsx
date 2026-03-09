import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, UserPlus, Zap, Building, HardHat } from 'lucide-react'
import { api } from '../services/api'

export default function RegisterPage({ onLogin }) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '', password: '', fullName: '', phone: '', role: 'employer'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await api.register(form)
            onLogin(res.user, res.accessToken)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Kayıt başarısız')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card animate-in" style={{ maxWidth: 500 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Link to="/" className="navbar-brand" style={{ justifyContent: 'center' }}>
                        <div className="logo-icon"><Zap size={18} color="white" /></div>
                        Acil İş
                    </Link>
                </div>
                <h1>Hesap Oluştur</h1>
                <p className="subtitle">Ücretsiz kaydol ve acil işini bul</p>

                {error && (
                    <div style={{
                        padding: '12px 16px', borderRadius: 'var(--radius-md)',
                        background: 'var(--danger-light)', color: '#991B1B',
                        fontSize: '0.85rem', marginBottom: 16
                    }}>{error}</div>
                )}

                {/* Role Selector */}
                <div className="role-selector">
                    <div
                        className={`role-option ${form.role === 'employer' ? 'selected' : ''}`}
                        onClick={() => setForm({ ...form, role: 'employer' })}
                    >
                        <div className="role-icon"><Building size={28} color="var(--primary)" /></div>
                        <h3>İşveren</h3>
                        <p>Çalışan arıyorum</p>
                    </div>
                    <div
                        className={`role-option ${form.role === 'worker' ? 'selected' : ''}`}
                        onClick={() => setForm({ ...form, role: 'worker' })}
                    >
                        <div className="role-icon"><HardHat size={28} color="var(--primary)" /></div>
                        <h3>Çalışan</h3>
                        <p>İş arıyorum</p>
                    </div>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label><User size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Ad Soyad</label>
                        <input
                            className="input" placeholder="Ahmet Yılmaz"
                            value={form.fullName}
                            onChange={e => setForm({ ...form, fullName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label><Mail size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />E-posta</label>
                        <input
                            className="input" type="email" placeholder="ornek@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label><Phone size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Telefon</label>
                        <input
                            className="input" placeholder="+90 555 123 4567"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                    <div className="input-group">
                        <label><Lock size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Şifre</label>
                        <input
                            className="input" type="password" placeholder="En az 6 karakter"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required minLength={6}
                        />
                    </div>
                    <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                        <UserPlus size={18} />
                        {loading ? 'Kayıt yapılıyor...' : 'Kaydol'}
                    </button>
                </form>

                <div className="auth-footer">
                    Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
                </div>
            </div>
        </div>
    )
}
