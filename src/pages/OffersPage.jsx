import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, Briefcase, ArrowRight, Filter } from 'lucide-react'

const MOCK_OFFERS = [
    { id: '1', jobTitle: 'Garson - Lara Restaurant', company: 'Lara Beach Restaurant', rate: 180, hours: 6, status: 'pending', time: '30 dk önce', jobId: '1' },
    { id: '2', jobTitle: 'Barista - Cafe Noir', company: 'Cafe Noir', rate: 150, hours: 5, status: 'accepted', time: '2 saat önce', jobId: '3' },
    { id: '3', jobTitle: 'Etkinlik Ekibi', company: 'EventPro Antalya', rate: 220, hours: 10, status: 'pending', time: '1 saat önce', jobId: '4' },
    { id: '4', jobTitle: 'Resepsiyon - Grand Hotel', company: 'Grand Hotel Antalya', rate: 200, hours: 8, status: 'rejected', time: '1 gün önce', jobId: '2' },
    { id: '5', jobTitle: 'Kat Temizlik', company: 'Dedeman Hotel', rate: 160, hours: 8, status: 'accepted', time: '3 gün önce', jobId: '6' },
]

const statusConfig = {
    pending: { label: 'Bekliyor', class: 'badge-warning', icon: Clock },
    accepted: { label: 'Kabul Edildi', class: 'badge-success', icon: CheckCircle },
    rejected: { label: 'Reddedildi', class: 'badge-danger', icon: XCircle },
}

export default function OffersPage({ user }) {
    const [offers, setOffers] = useState(MOCK_OFFERS)
    const [activeFilter, setActiveFilter] = useState('all')
    const isWorker = user.role === 'worker'

    const handleAction = (offerId, action) => {
        setOffers(prev => prev.map(o =>
            o.id === offerId ? { ...o, status: action } : o
        ))
    }

    const filtered = offers.filter(o =>
        activeFilter === 'all' || o.status === activeFilter
    )

    const counts = {
        all: offers.length,
        pending: offers.filter(o => o.status === 'pending').length,
        accepted: offers.filter(o => o.status === 'accepted').length,
        rejected: offers.filter(o => o.status === 'rejected').length,
    }

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <Briefcase size={28} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        {isWorker ? 'Gelen Teklifler' : 'Gönderilen Teklifler'}
                    </h1>
                    <p>{isWorker ? 'İşverenlerden gelen iş teklifleriniz' : 'Çalışanlara gönderdiğiniz teklifler'}</p>
                </div>

                {/* Filter Tabs */}
                <div className="filter-chips" style={{ marginBottom: 'var(--space-xl)' }}>
                    {[
                        { key: 'all', label: `Tümü (${counts.all})` },
                        { key: 'pending', label: `Bekleyen (${counts.pending})` },
                        { key: 'accepted', label: `Kabul (${counts.accepted})` },
                        { key: 'rejected', label: `Red (${counts.rejected})` },
                    ].map(f => (
                        <button
                            key={f.key}
                            className={`chip ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Offers List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map(offer => {
                        const sc = statusConfig[offer.status]
                        const StatusIcon = sc.icon
                        return (
                            <div key={offer.id} className="card" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                    <div style={{ flex: 1, minWidth: 200 }}>
                                        <Link to={`/jobs/${offer.jobId}`} style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                                            {offer.jobTitle}
                                        </Link>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                                            {offer.company} • {offer.time}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--success)' }}>₺{offer.rate}/sa</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                Toplam: ₺{(offer.rate * offer.hours).toLocaleString('tr-TR')}
                                            </div>
                                        </div>

                                        <span className={`badge ${sc.class}`}>
                                            <StatusIcon size={12} /> {sc.label}
                                        </span>

                                        {isWorker && offer.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ background: 'var(--success)', color: 'white' }}
                                                    onClick={() => handleAction(offer.id, 'accepted')}
                                                >
                                                    <CheckCircle size={14} /> Kabul
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ background: 'var(--danger)', color: 'white' }}
                                                    onClick={() => handleAction(offer.id, 'rejected')}
                                                >
                                                    <XCircle size={14} /> Ret
                                                </button>
                                            </div>
                                        )}

                                        <Link to={`/jobs/${offer.jobId}`} className="btn btn-ghost btn-sm">
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                        <Briefcase size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <p>Bu filtreye uygun teklif yok</p>
                    </div>
                )}
            </div>
        </div>
    )
}
