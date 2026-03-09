import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Briefcase, Users, Star, TrendingUp, Clock, MapPin,
    Plus, Bell, CheckCircle, XCircle, ArrowRight, Zap, ToggleLeft, ToggleRight,
    PartyPopper, Mail, MessageCircle
} from 'lucide-react'

export default function DashboardPage({ user }) {
    const isEmployer = user.role === 'employer'
    const [available, setAvailable] = useState(true)

    return (
        <div className="page">
            <div className="container">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                            Merhaba, {user.fullName}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {isEmployer ? 'İşveren Paneli' : 'Çalışan Paneli'} — Antalya
                        </p>
                    </div>
                    {isEmployer ? (
                        <Link to="/jobs/create" className="btn btn-primary">
                            <Plus size={16} /> Yeni İlan
                        </Link>
                    ) : (
                        <button
                            className={`btn ${available ? 'btn-primary' : 'btn-secondary'} `}
                            onClick={() => setAvailable(!available)}
                        >
                            {available ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                            {available ? 'Müsaitim' : 'Müsait Değilim'}
                        </button>
                    )}
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                    {isEmployer ? (
                        <>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <Briefcase size={24} style={{ color: 'var(--primary-light)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>12</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Aktif İlan</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <Users size={24} style={{ color: 'var(--accent)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>48</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Toplam İşe Alım</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <Star size={24} style={{ color: '#F59E0B', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>4.8</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>İşveren Puanı</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <TrendingUp size={24} style={{ color: 'var(--success)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>₺24.5K</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bu Ay Harcama</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <CheckCircle size={24} style={{ color: 'var(--success)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>34</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Tamamlanan İş</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <Star size={24} style={{ color: '#F59E0B', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>4.9</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Puanım</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <TrendingUp size={24} style={{ color: 'var(--success)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>₺8.2K</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bu Ay Kazanç</div>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <Clock size={24} style={{ color: 'var(--info)', marginBottom: 8 }} />
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>3</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bekleyen Teklif</div>
                            </div>
                        </>
                    )}
                </div>

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-lg)' }}>
                    {/* Recent Activity */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                                {isEmployer ? 'Son İlanlarınız' : 'Son Teklifler'}
                            </h2>
                            <Link to="/offers" className="btn btn-ghost btn-sm">
                                Tümünü Gör <ArrowRight size={14} />
                            </Link>
                        </div>

                        {isEmployer ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { title: 'Garson Aranıyor - Akşam', status: 'open', time: '2 saat önce', applicants: 5 },
                                    { title: 'Resepsiyon Görevlisi', status: 'filled', time: '1 gün önce', applicants: 3 },
                                    { title: 'Bulaşıkçı Acil', status: 'open', time: '3 saat önce', applicants: 2 },
                                    { title: 'Etkinlik Organizasyon', status: 'completed', time: '2 gün önce', applicants: 8 },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)',
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.time} • {item.applicants} başvuru</div>
                                        </div>
                                        <span className={`badge ${item.status === 'open' ? 'badge-success' :
                                                item.status === 'filled' ? 'badge-warning' : 'badge-info'
                                            } `}>
                                            {item.status === 'open' ? 'Açık' : item.status === 'filled' ? 'Dolu' : 'Tamamlandı'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { title: 'Garson - Lara Restaurant', rate: '₺180/sa', status: 'pending', time: '30 dk önce' },
                                    { title: 'Barista - Cafe Noir', rate: '₺150/sa', status: 'accepted', time: '2 saat önce' },
                                    { title: 'Etkinlik Ekibi', rate: '₺220/sa', status: 'pending', time: '1 saat önce' },
                                    { title: 'Resepsiyon - Grand Hotel', rate: '₺200/sa', status: 'rejected', time: '1 gün önce' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)',
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.time} • {item.rate}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <span className={`badge ${item.status === 'pending' ? 'badge-warning' :
                                                    item.status === 'accepted' ? 'badge-success' : 'badge-danger'
                                                } `}>
                                                {item.status === 'pending' ? 'Bekliyor' : item.status === 'accepted' ? 'Kabul' : 'Red'}
                                            </span>
                                            {item.status === 'pending' && (
                                                <div style={{ display: 'flex', gap: 4 }}>
                                                    <button className="btn btn-sm" style={{ background: 'var(--success)', color: 'white', padding: '4px 10px' }}>
                                                        <CheckCircle size={12} />
                                                    </button>
                                                    <button className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', padding: '4px 10px' }}>
                                                        <XCircle size={12} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notifications */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
                            <Bell size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                            Bildirimler
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { icon: <CheckCircle size={16} color="var(--success)" />, text: 'Mehmet Kara teklifinizi kabul etti', time: '5 dk önce', unread: true },
                                { icon: <Mail size={16} color="var(--primary)" />, text: 'Yeni iş teklifi: Barista pozisyonu', time: '30 dk önce', unread: true },
                                { icon: <Star size={16} color="var(--accent)" />, text: 'Grand Hotel size 5 yıldız verdi', time: '1 saat önce', unread: false },
                                { icon: <MessageCircle size={16} color="var(--info)" />, text: 'Ayşe Demir mesaj gönderdi', time: '2 saat önce', unread: false },
                                { icon: <CheckCircle size={16} color="var(--success)" />, text: 'İşiniz başarıyla tamamlandı', time: '1 gün önce', unread: false },
                            ].map((notif, i) => (
                                <div key={i} style={{
                                    padding: 10, borderRadius: 'var(--radius-md)',
                                    background: notif.unread ? 'rgba(14, 165, 233, 0.06)' : 'transparent',
                                    borderLeft: notif.unread ? '3px solid var(--primary)' : '3px solid transparent',
                                }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '1.1rem' }}>{notif.icon}</span>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', fontWeight: notif.unread ? 600 : 400 }}>{notif.text}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{notif.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
