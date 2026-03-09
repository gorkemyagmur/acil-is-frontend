import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, Clock, DollarSign, Users, Zap, ArrowLeft } from 'lucide-react'
import { api } from '../services/api'

export default function CreateJobPage({ user }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '', description: '', categoryId: '', address: '',
        latitude: 36.8969, longitude: 30.7133,
        hourlyRate: '', estimatedHours: '', workersNeeded: 1,
        urgency: 'today',
    })

    const categories = [
        { id: 'restoran', name: 'Restoran' },
        { id: 'otel', name: 'Otel' },
        { id: 'kafe', name: 'Kafe' },
        { id: 'etkinlik', name: 'Etkinlik & Organizasyon' },
        { id: 'temizlik', name: 'Temizlik' },
        { id: 'diger', name: 'Diğer' },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.createJob({
                ...form,
                hourlyRate: parseFloat(form.hourlyRate),
                estimatedHours: parseFloat(form.estimatedHours),
                workersNeeded: parseInt(form.workersNeeded),
            })
            navigate('/jobs')
        } catch (err) {
            alert(err.message || 'İlan oluşturulamadı')
        } finally {
            setLoading(false)
        }
    }

    const u = (key, val) => setForm({ ...form, [key]: val })

    return (
        <div className="page">
            <div className="container">
                <div className="form-container">
                    <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Geri
                    </button>

                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>
                            <Briefcase size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                            Yeni İş İlanı
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
                            İlanınızı oluşturun, yakındaki çalışanlar anında görsün
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="input-group full-width">
                                    <label>İlan Başlığı *</label>
                                    <input className="input" placeholder="ör: Garson Aranıyor - Akşam Servisi"
                                        value={form.title} onChange={e => u('title', e.target.value)} required />
                                </div>

                                <div className="input-group">
                                    <label>Kategori *</label>
                                    <select className="select" value={form.categoryId}
                                        onChange={e => u('categoryId', e.target.value)} required>
                                        <option value="">Seçin</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Aciliyet</label>
                                    <select className="select" value={form.urgency}
                                        onChange={e => u('urgency', e.target.value)}>
                                        <option value="immediate">Hemen</option>
                                        <option value="today">Bugün</option>
                                        <option value="tomorrow">Yarın</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Saatlik Ücret (₺) *</label>
                                    <input className="input" type="number" placeholder="150"
                                        value={form.hourlyRate} onChange={e => u('hourlyRate', e.target.value)} required min="1" />
                                </div>

                                <div className="input-group">
                                    <label>Tahmini Süre (Saat)</label>
                                    <input className="input" type="number" placeholder="8"
                                        value={form.estimatedHours} onChange={e => u('estimatedHours', e.target.value)} min="0.5" step="0.5" />
                                </div>

                                <div className="input-group">
                                    <label>Kaç Kişi Gerekli</label>
                                    <input className="input" type="number" value={form.workersNeeded}
                                        onChange={e => u('workersNeeded', e.target.value)} min="1" />
                                </div>

                                <div className="input-group">
                                    <label>Adres</label>
                                    <input className="input" placeholder="Lara Caddesi No:42, Antalya"
                                        value={form.address} onChange={e => u('address', e.target.value)} />
                                </div>

                                <div className="input-group full-width">
                                    <label>Açıklama</label>
                                    <textarea className="textarea" placeholder="İş detaylarını, gerekli deneyimi vb. yazın..."
                                        value={form.description} onChange={e => u('description', e.target.value)} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 'var(--space-xl)' }}>
                                <button className="btn btn-primary btn-lg" type="submit" style={{ flex: 1 }} disabled={loading}>
                                    <Zap size={18} />
                                    {loading ? 'Oluşturuluyor...' : 'İlanı Yayınla'}
                                </button>
                            </div>

                            {form.hourlyRate && form.estimatedHours && (
                                <div style={{
                                    marginTop: 16, padding: 16, borderRadius: 'var(--radius-md)',
                                    background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
                                    textAlign: 'center'
                                }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tahmini Toplam: </span>
                                    <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.2rem' }}>
                                        ₺{(parseFloat(form.hourlyRate) * parseFloat(form.estimatedHours) * parseInt(form.workersNeeded || 1)).toLocaleString('tr-TR')}
                                    </span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
