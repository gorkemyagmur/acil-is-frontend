import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft, MapPin, Clock, Users, Star, Send, MessageCircle,
    Building, Calendar, DollarSign, Zap, CheckCircle, Share2
} from 'lucide-react'

const MOCK_JOBS = {
    '1': { id: '1', title: 'Garson Aranıyor - Akşam Servisi', company: 'Lara Beach Restaurant', category: 'Restoran', urgency: 'immediate', hourlyRate: 180, estimatedHours: 6, address: 'Lara Cad. No:42, Antalya', distance: '1.2 km', workersNeeded: 2, description: 'Akşam servisi için deneyimli garson aranmaktadır. 18:00-00:00 arası çalışılacaktır. Servis deneyimi olan adaylar tercih edilir. Bahşiş ayrıdır.', status: 'open', postedAt: '2 saat önce', employer: { name: 'Ahmet Kaya', rating: 4.8, totalJobs: 32 } },
    '2': { id: '2', title: 'Resepsiyon Görevlisi', company: 'Grand Hotel Antalya', category: 'Otel', urgency: 'today', hourlyRate: 200, estimatedHours: 8, address: 'Konyaaltı Blv. No:88, Antalya', distance: '3.5 km', workersNeeded: 1, description: 'Beş yıldızlı otelimizde resepsiyon görevlisi aranmaktadır. İngilizce bilen adaylar tercih edilecektir. Gece vardiyası olabilir.', status: 'open', postedAt: '5 saat önce', employer: { name: 'Mehmet Yıldız', rating: 4.6, totalJobs: 18 } },
    '3': { id: '3', title: 'Barista - Sabah Vardiyası', company: 'Cafe Noir', category: 'Kafe', urgency: 'tomorrow', hourlyRate: 150, estimatedHours: 5, address: 'Muratpaşa Mah. No:15, Antalya', distance: '0.8 km', workersNeeded: 1, description: 'Sabah 07:00-12:00 arası çalışacak barista aranıyor. Temel kahve bilgisi yeterlidir. Eğitim verilecektir.', status: 'open', postedAt: '1 gün önce', employer: { name: 'Zeynep Demir', rating: 4.9, totalJobs: 45 } },
    '4': { id: '4', title: 'Etkinlik Organizasyon Ekibi', company: 'EventPro Antalya', category: 'Etkinlik', urgency: 'immediate', hourlyRate: 220, estimatedHours: 10, address: 'Belek, Antalya', distance: '15 km', workersNeeded: 5, description: 'Büyük düğün organizasyonu için 5 kişilik ekip aranmaktadır. Servis, setup ve dekor işlerinde yardımcı olacaksınız. Yemek ve ulaşım karşılanır.', status: 'open', postedAt: '30 dk önce', employer: { name: 'Ali Öztürk', rating: 5.0, totalJobs: 67 } },
    '5': { id: '5', title: 'Bulaşıkçı Acil', company: 'Kaleiçi Restaurant', category: 'Restoran', urgency: 'immediate', hourlyRate: 130, estimatedHours: 4, address: 'Kaleiçi, Antalya', distance: '2.1 km', workersNeeded: 1, description: 'Öğle servisi için acil bulaşıkçı aranıyor. 11:00-15:00 arası. Tecrübe şart değildir.', status: 'open', postedAt: '15 dk önce', employer: { name: 'Can Yılmaz', rating: 4.3, totalJobs: 12 } },
    '6': { id: '6', title: 'Kat Temizlik Görevlisi', company: 'Dedeman Hotel', category: 'Otel', urgency: 'today', hourlyRate: 160, estimatedHours: 8, address: 'Lara, Antalya', distance: '4.0 km', workersNeeded: 3, description: 'Otelimizde kat temizlik görevlisi olarak çalışacak 3 kişi arıyoruz. 08:00-16:00 arası çalışılacaktır. Deneyim tercih sebebidir.', status: 'open', postedAt: '3 saat önce', employer: { name: 'Fatma Aksoy', rating: 4.7, totalJobs: 28 } },
}

const urgencyMap = {
    immediate: { label: 'Acil', class: 'badge-danger', desc: 'Hemen başlanacak' },
    today: { label: 'Bugün', class: 'badge-warning', desc: 'Bugün içinde' },
    tomorrow: { label: 'Yarın', class: 'badge-info', desc: 'Yarın başlanacak' },
}

export default function JobDetailPage({ user }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [applied, setApplied] = useState(false)

    const job = MOCK_JOBS[id]

    if (!job) {
        return (
            <div className="page">
                <div className="container" style={{ textAlign: 'center', paddingTop: 80 }}>
                    <h2>İlan Bulunamadı</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: '16px 0' }}>Bu ilan mevcut değil veya kaldırılmış olabilir.</p>
                    <Link to="/jobs" className="btn btn-primary">İlanlara Dön</Link>
                </div>
            </div>
        )
    }

    const totalPay = job.hourlyRate * job.estimatedHours
    const isWorker = user.role === 'worker'

    return (
        <div className="page">
            <div className="container">
                <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
                    <ArrowLeft size={16} /> Geri
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                    {/* Main Content */}
                    <div>
                        {/* Header Card */}
                        <div className="card" style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                <div>
                                    <span className={`badge ${urgencyMap[job.urgency]?.class}`} style={{ marginBottom: 8 }}>
                                        {urgencyMap[job.urgency]?.label} — {urgencyMap[job.urgency]?.desc}
                                    </span>
                                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: 8 }}>{job.title}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, color: 'var(--text-secondary)' }}>
                                        <Building size={16} /> {job.company}
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-icon" title="Paylaş"><Share2 size={18} /></button>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', margin: '16px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <MapPin size={16} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem' }}>{job.address}</span>
                                    <span className="badge badge-neutral">{job.distance}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Clock size={16} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem' }}>{job.estimatedHours} saat</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Users size={16} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem' }}>{job.workersNeeded} kişi aranıyor</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{job.postedAt}</span>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>İş Detayları</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{job.description}</p>
                        </div>

                        {/* Employer Info */}
                        <div className="card">
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>İşveren Bilgisi</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-gradient)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', fontWeight: 700, color: 'white'
                                }}>
                                    {job.employer.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{job.employer.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent)' }}>
                                            <Star size={14} fill="currentColor" /> {job.employer.rating}
                                        </span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                            • {job.employer.totalJobs} iş yayınladı
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Pay Card */}
                        <div className="card" style={{ marginBottom: 20, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Saatlik Ücret</div>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)' }}>
                                ₺{job.hourlyRate}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/saat</span>
                            </div>
                            <div style={{
                                marginTop: 16, padding: 12, borderRadius: 'var(--radius-md)',
                                background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)'
                            }}>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Tahmini Toplam Kazanç</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                                    ₺{totalPay.toLocaleString('tr-TR')}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {job.estimatedHours} saat × ₺{job.hourlyRate}
                                </div>
                            </div>

                            {isWorker && (
                                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {applied ? (
                                        <button className="btn btn-secondary btn-lg" disabled style={{ width: '100%' }}>
                                            <CheckCircle size={18} /> Başvuru Gönderildi
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setApplied(true)}>
                                            <Send size={18} /> Hemen Başvur
                                        </button>
                                    )}
                                    <button className="btn btn-secondary" style={{ width: '100%' }}>
                                        <MessageCircle size={16} /> Mesaj Gönder
                                    </button>
                                </div>
                            )}

                            {!isWorker && (
                                <div style={{ marginTop: 16 }}>
                                    <Link to="/workers" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                        <Users size={18} /> Çalışan Bul
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="card" style={{ textAlign: 'center' }}>
                            <span className="badge badge-primary" style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
                                {job.category}
                            </span>
                            <div style={{ marginTop: 12, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                Durum: <span className="badge badge-success">Açık</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
