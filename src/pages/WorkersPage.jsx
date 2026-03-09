import { useState } from 'react'
import { Users, Star, MapPin, Send, Search, Filter } from 'lucide-react'

const MOCK_WORKERS = [
    { id: '1', name: 'Mehmet Kara', category: 'Restoran', rating: 4.9, totalRatings: 45, totalJobs: 62, distance: '0.8 km', available: true, experience: 5, hourlyRate: '120-180' },
    { id: '2', name: 'Ayşe Demir', category: 'Otel', rating: 4.7, totalRatings: 38, totalJobs: 41, distance: '1.2 km', available: true, experience: 3, hourlyRate: '150-200' },
    { id: '3', name: 'Ali Yılmaz', category: 'Kafe', rating: 4.8, totalRatings: 52, totalJobs: 78, distance: '2.1 km', available: true, experience: 7, hourlyRate: '100-150' },
    { id: '4', name: 'Fatma Öz', category: 'Etkinlik', rating: 5.0, totalRatings: 23, totalJobs: 28, distance: '3.5 km', available: true, experience: 4, hourlyRate: '180-250' },
    { id: '5', name: 'Hasan Ak', category: 'Restoran', rating: 4.5, totalRatings: 30, totalJobs: 35, distance: '0.5 km', available: false, experience: 2, hourlyRate: '100-140' },
    { id: '6', name: 'Zeynep Tan', category: 'Temizlik', rating: 4.6, totalRatings: 19, totalJobs: 22, distance: '4.0 km', available: true, experience: 6, hourlyRate: '130-170' },
    { id: '7', name: 'Emre Can', category: 'Restoran', rating: 4.3, totalRatings: 15, totalJobs: 18, distance: '1.8 km', available: true, experience: 1, hourlyRate: '100-130' },
    { id: '8', name: 'Selin Yurt', category: 'Otel', rating: 4.9, totalRatings: 41, totalJobs: 55, distance: '2.5 km', available: true, experience: 8, hourlyRate: '160-220' },
]

export default function WorkersPage({ user }) {
    const [workers] = useState(MOCK_WORKERS)
    const [search, setSearch] = useState('')

    const renderStars = (rating) => {
        return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '')
    }

    const filtered = workers.filter(w =>
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <Users size={28} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Yakındaki Çalışanlar
                    </h1>
                    <p>Antalya bölgesinde müsait çalışanları keşfedin</p>
                </div>

                <div className="page-toolbar">
                    <div className="search-bar">
                        <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        <input
                            placeholder="İsim veya kategori ara..."
                            value={search} onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {filtered.filter(w => w.available).length} müsait çalışan
                        </span>
                    </div>
                </div>

                <div className="workers-grid">
                    {filtered.map(worker => (
                        <div key={worker.id} className="worker-card">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div className="worker-avatar">
                                    {worker.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span
                                    className={`availability-dot ${worker.available ? 'online' : 'offline'}`}
                                    style={{ position: 'absolute', bottom: 4, right: -2, width: 12, height: 12, border: '2px solid var(--bg-card)' }}
                                />
                            </div>

                            <h3>{worker.name}</h3>
                            <div className="worker-category">{worker.category} • {worker.experience} yıl tecrübe</div>

                            <div className="worker-rating">
                                <span className="stars">{renderStars(worker.rating)}</span>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{worker.rating}</span>
                                <span className="count">({worker.totalRatings})</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                                <span className="badge badge-neutral">
                                    <MapPin size={10} /> {worker.distance}
                                </span>
                                <span className="badge badge-neutral">
                                    ₺{worker.hourlyRate}/sa
                                </span>
                                {worker.available ? (
                                    <span className="badge badge-success">Müsait</span>
                                ) : (
                                    <span className="badge badge-neutral">Meşgul</span>
                                )}
                            </div>

                            <div className="worker-stats">
                                <div className="worker-stat">
                                    <div className="value">{worker.totalJobs}</div>
                                    <div className="label">İş</div>
                                </div>
                                <div className="worker-stat">
                                    <div className="value">{worker.rating}</div>
                                    <div className="label">Puan</div>
                                </div>
                                <div className="worker-stat">
                                    <div className="value">{worker.experience}y</div>
                                    <div className="label">Tecrübe</div>
                                </div>
                            </div>

                            <button
                                className={`btn ${worker.available ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                                style={{ width: '100%' }}
                                disabled={!worker.available}
                            >
                                <Send size={14} />
                                {worker.available ? 'Teklif Gönder' : 'Müsait Değil'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
