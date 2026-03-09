import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, Clock, Search, Filter, Zap, Users } from 'lucide-react'
import { api } from '../services/api'

const CATEGORIES = [
    { id: 'all', name: 'Tümü' },
    { id: 'restoran', name: 'Restoran' },
    { id: 'otel', name: 'Otel' },
    { id: 'kafe', name: 'Kafe' },
    { id: 'etkinlik', name: 'Etkinlik' },
    { id: 'temizlik', name: 'Temizlik' },
    { id: 'diger', name: 'Diğer' },
]

const MOCK_JOBS = [
    { id: '1', title: 'Garson Aranıyor - Akşam Servisi', company: 'Lara Beach Restaurant', category: 'Restoran', urgency: 'immediate', hourlyRate: 180, estimatedHours: 6, address: 'Lara, Antalya', distance: '1.2 km', workersNeeded: 2 },
    { id: '2', title: 'Resepsiyon Görevlisi', company: 'Grand Hotel Antalya', category: 'Otel', urgency: 'today', hourlyRate: 200, estimatedHours: 8, address: 'Konyaaltı, Antalya', distance: '3.5 km', workersNeeded: 1 },
    { id: '3', title: 'Barista - Sabah Vardiyası', company: 'Cafe Noir', category: 'Kafe', urgency: 'tomorrow', hourlyRate: 150, estimatedHours: 5, address: 'Muratpaşa, Antalya', distance: '0.8 km', workersNeeded: 1 },
    { id: '4', title: 'Etkinlik Organizasyon Ekibi', company: 'EventPro Antalya', category: 'Etkinlik', urgency: 'immediate', hourlyRate: 220, estimatedHours: 10, address: 'Belek, Antalya', distance: '15 km', workersNeeded: 5 },
    { id: '5', title: 'Bulaşıkçı Acil', company: 'Kaleiçi Restaurant', category: 'Restoran', urgency: 'immediate', hourlyRate: 130, estimatedHours: 4, address: 'Kaleiçi, Antalya', distance: '2.1 km', workersNeeded: 1 },
    { id: '6', title: 'Kat Temizlik Görevlisi', company: 'Dedeman Hotel', category: 'Otel', urgency: 'today', hourlyRate: 160, estimatedHours: 8, address: 'Lara, Antalya', distance: '4.0 km', workersNeeded: 3 },
]

const urgencyMap = { immediate: { label: 'Acil', class: 'badge-danger' }, today: { label: 'Bugün', class: 'badge-warning' }, tomorrow: { label: 'Yarın', class: 'badge-info' } }

export default function JobsPage({ user }) {
    const [jobs, setJobs] = useState(MOCK_JOBS)
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')

    const filtered = jobs.filter(j => {
        const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase())
        const matchCategory = activeCategory === 'all' ||
            j.category.toLowerCase().includes(activeCategory.toLowerCase())
        return matchSearch && matchCategory
    })

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <Briefcase size={28} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        {user.role === 'worker' ? 'Yakındaki İş Fırsatları' : 'İş İlanları'}
                    </h1>
                    <p>Antalya bölgesindeki açık pozisyonları keşfet</p>
                </div>

                {/* Toolbar */}
                <div className="page-toolbar">
                    <div className="search-bar">
                        <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        <input
                            placeholder="İş veya şirket ara..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {user.role === 'employer' && (
                        <Link to="/jobs/create" className="btn btn-primary">
                            <Zap size={16} /> Yeni İlan Oluştur
                        </Link>
                    )}
                </div>

                {/* Category Chips */}
                <div className="filter-chips" style={{ marginBottom: 'var(--space-xl)' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`chip ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Jobs Grid */}
                <div className="jobs-grid">
                    {filtered.map(job => (
                        <Link to={`/jobs/${job.id}`} key={job.id} className="job-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="job-card-header">
                                <div>
                                    <h3>{job.title}</h3>
                                    <div className="company">{job.company}</div>
                                </div>
                                <span className={`badge ${urgencyMap[job.urgency]?.class}`}>
                                    {urgencyMap[job.urgency]?.label}
                                </span>
                            </div>

                            <div className="job-meta">
                                <div className="job-meta-item">
                                    <MapPin size={14} /> {job.address}
                                </div>
                                <div className="job-meta-item">
                                    <Clock size={14} /> {job.estimatedHours} saat
                                </div>
                                <div className="job-meta-item">
                                    <Users size={14} /> {job.workersNeeded} kişi
                                </div>
                                {job.distance && (
                                    <div className="job-meta-item">
                                        <MapPin size={14} /> {job.distance}
                                    </div>
                                )}
                            </div>

                            <div className="job-card-footer">
                                <div className="job-pay">
                                    ₺{job.hourlyRate}<span>/saat</span>
                                </div>
                                <span className="btn btn-primary btn-sm">
                                    Detayları Gör
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                        <Briefcase size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <p>Aramanıza uygun ilan bulunamadı</p>
                    </div>
                )}
            </div>
        </div>
    )
}
