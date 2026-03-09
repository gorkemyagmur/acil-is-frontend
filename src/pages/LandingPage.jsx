import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Zap, Shield, MessageCircle } from 'lucide-react'

export default function LandingPage() {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link to="/" className="navbar-brand">
                        <div className="logo-icon"><Zap size={18} color="white" /></div>
                        Acil İş
                    </Link>
                    <div className="navbar-actions">
                        <Link to="/login" className="btn btn-ghost">Giriş Yap</Link>
                        <Link to="/register" className="btn btn-primary">Ücretsiz Başla</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content animate-in">
                        <div className="hero-badge">
                            Antalya'da Canlı — MVP Aktif
                        </div>
                        <h1>
                            Acil İşini<br />
                            <span>Hemen Bul</span>
                        </h1>
                        <p>
                            Restoran, otel, kafe ve etkinlik organizasyonları için
                            yakınındaki çalışanları saniyeler içinde bul. Uber gibi hızlı eşleşme.
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                <Zap size={20} /> Hemen Başla
                            </Link>
                            <Link to="/register" className="btn btn-secondary btn-lg">
                                Çalışan Olarak Katıl
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="container">
                <div className="stats-bar">
                    <div className="stat-item animate-in">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Aktif Çalışan</div>
                    </div>
                    <div className="stat-item animate-in" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-number">1,200+</div>
                        <div className="stat-label">Tamamlanan İş</div>
                    </div>
                    <div className="stat-item animate-in" style={{ animationDelay: '0.2s' }}>
                        <div className="stat-number">3 dk</div>
                        <div className="stat-label">Ort. Eşleşme Süresi</div>
                    </div>
                    <div className="stat-item animate-in" style={{ animationDelay: '0.3s' }}>
                        <div className="stat-number">4.8</div>
                        <div className="stat-label">Kullanıcı Puanı</div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container">
                <div className="section-header">
                    <h2>Nasıl Çalışır?</h2>
                    <p>4 basit adımda acil iş gücünü bul</p>
                </div>
                <div className="steps-grid">
                    <div className="step-card animate-in">
                        <div className="step-number">1</div>
                        <h3>İlan Oluştur</h3>
                        <p>İhtiyacın olan pozisyon, saat ve ücreti belirle</p>
                    </div>
                    <div className="step-card animate-in" style={{ animationDelay: '0.1s' }}>
                        <div className="step-number">2</div>
                        <h3>Yakın Çalışan Bul</h3>
                        <p>GPS ile etrafındaki uygun çalışanları gör</p>
                    </div>
                    <div className="step-card animate-in" style={{ animationDelay: '0.2s' }}>
                        <div className="step-number">3</div>
                        <h3>Teklif Gönder</h3>
                        <p>Beğendiğin çalışana anında teklif gönder</p>
                    </div>
                    <div className="step-card animate-in" style={{ animationDelay: '0.3s' }}>
                        <div className="step-number">4</div>
                        <h3>İşe Başla</h3>
                        <p>Çalışan kabul etti — iş başlasın!</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Neden Acil İş?</h2>
                        <p>İşverenlere ve çalışanlara özel güçlü özellikler</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon purple"><MapPin size={24} /></div>
                            <h3>GPS Eşleşme</h3>
                            <p>PostGIS tabanlı konum eşleştirmesi ile yakınındaki çalışanları saniyede bul.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon amber"><Clock size={24} /></div>
                            <h3>Anında Eşleşme</h3>
                            <p>Uber benzeri genişleyen yarıçap algoritması ile en uygun çalışanı otomatik bul.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon green"><Star size={24} /></div>
                            <h3>Puan Sistemi</h3>
                            <p>İşveren ve çalışan karşılıklı puanlama ile güvenilir bir topluluk oluştur.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon blue"><MessageCircle size={24} /></div>
                            <h3>Anlık Mesajlaşma</h3>
                            <p>WebSocket tabanlı gerçek zamanlı sohbet ile anında iletişim kur.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon red"><Zap size={24} /></div>
                            <h3>Acil Bildirimler</h3>
                            <p>Yeni teklifler ve iş fırsatları için anlık push bildirimler al.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon teal"><Shield size={24} /></div>
                            <h3>Güvenli Platform</h3>
                            <p>JWT kimlik doğrulama ve şifreli iletişim ile verilerini koru.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 16 }}>
                    Hemen <span style={{
                        background: 'var(--primary-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>Başlayın</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
                    Acil iş gücü bulmak hiç bu kadar kolay olmamıştı. Bugün ücretsiz kaydolun.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/register" className="btn btn-primary btn-lg">İşveren Olarak Kaydol</Link>
                    <Link to="/register" className="btn btn-accent btn-lg">Çalışan Olarak Kaydol</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="navbar-brand">
                                <div className="logo-icon"><Zap size={18} color="white" /></div>
                                Acil İş
                            </div>
                            <p>Acil kısa süreli iş arayanlarla işverenleri hızlıca eşleştiren dijital pazar yeri.</p>
                        </div>
                        <div className="footer-col">
                            <h4>Platform</h4>
                            <a href="#">Nasıl Çalışır</a>
                            <a href="#">Fiyatlandırma</a>
                            <a href="#">SSS</a>
                        </div>
                        <div className="footer-col">
                            <h4>Şirket</h4>
                            <a href="#">Hakkımızda</a>
                            <a href="#">Blog</a>
                            <a href="#">İletişim</a>
                        </div>
                        <div className="footer-col">
                            <h4>Yasal</h4>
                            <a href="#">Gizlilik Politikası</a>
                            <a href="#">Kullanım Şartları</a>
                            <a href="#">KVKK</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        © 2026 Acil İş. Tüm hakları saklıdır. Antalya, Türkiye
                    </div>
                </div>
            </footer>
        </>
    )
}
