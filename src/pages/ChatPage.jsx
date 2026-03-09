import { useState, useRef, useEffect } from 'react'
import { Send, Search, ArrowLeft, Phone, MoreVertical, MessageCircle } from 'lucide-react'

const MOCK_CONVERSATIONS = [
    { id: '1', name: 'Ahmet Kaya', role: 'İşveren', lastMessage: 'Yarın saat 18:00 de gelebilir misin?', time: '5 dk', unread: 2, avatar: 'AK' },
    { id: '2', name: 'Mehmet Yıldız', role: 'İşveren', lastMessage: 'Tamamdır, seni bekliyoruz.', time: '30 dk', unread: 0, avatar: 'MY' },
    { id: '3', name: 'Zeynep Demir', role: 'İşveren', lastMessage: 'Kafede deneyimin var mı?', time: '2 sa', unread: 1, avatar: 'ZD' },
    { id: '4', name: 'Ali Öztürk', role: 'İşveren', lastMessage: 'Etkinlik saat 14:00 de başlıyor.', time: '1 gün', unread: 0, avatar: 'AÖ' },
]

const MOCK_MESSAGES = {
    '1': [
        { id: 1, sender: 'them', text: 'Merhaba, ilanımıza başvurunuzu gördük.', time: '14:30' },
        { id: 2, sender: 'them', text: 'Akşam servisi için garson arıyorduk, deneyiminiz var mı?', time: '14:31' },
        { id: 3, sender: 'me', text: 'Merhaba! Evet, 3 yıldır garsonluk yapıyorum.', time: '14:35' },
        { id: 4, sender: 'me', text: 'Lara bölgesine de yakınım, hemen gelebilirim.', time: '14:35' },
        { id: 5, sender: 'them', text: 'Harika! Saatlik ücretimiz 180₺, uygun mu?', time: '14:40' },
        { id: 6, sender: 'me', text: 'Evet, uygundur.', time: '14:42' },
        { id: 7, sender: 'them', text: 'Yarın saat 18:00 de gelebilir misin?', time: '14:45' },
    ],
    '2': [
        { id: 1, sender: 'me', text: 'Teklifinizi kabul ediyorum.', time: '10:00' },
        { id: 2, sender: 'them', text: 'Tamamdır, seni bekliyoruz.', time: '10:05' },
    ],
    '3': [
        { id: 1, sender: 'them', text: 'Merhaba, profilinizi beğendik.', time: '09:00' },
        { id: 2, sender: 'them', text: 'Kafede deneyimin var mı?', time: '09:01' },
    ],
}

export default function ChatPage({ user }) {
    const [activeChat, setActiveChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const messagesEnd = useRef(null)

    useEffect(() => {
        if (activeChat) {
            setMessages(MOCK_MESSAGES[activeChat.id] || [])
        }
    }, [activeChat])

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        const msg = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages(prev => [...prev, msg])
        setNewMessage('')
    }

    return (
        <div className="page" style={{ paddingBottom: 0 }}>
            <div className="container" style={{ height: 'calc(100vh - 112px)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>

                    {/* Sidebar - Conversation List */}
                    <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>Mesajlar</h2>
                            <div className="search-bar" style={{ maxWidth: '100%' }}>
                                <Search size={16} style={{ color: 'var(--text-muted)' }} />
                                <input placeholder="Sohbet ara..." style={{ background: 'transparent', border: 'none', color: 'var(--text)', padding: '8px 0', width: '100%', fontSize: '0.85rem' }} />
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {MOCK_CONVERSATIONS.map(conv => (
                                <div
                                    key={conv.id}
                                    onClick={() => setActiveChat(conv)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                                        cursor: 'pointer', transition: 'background 0.15s',
                                        background: activeChat?.id === conv.id ? 'rgba(14, 165, 233, 0.06)' : 'transparent',
                                        borderLeft: activeChat?.id === conv.id ? '3px solid var(--primary)' : '3px solid transparent',
                                    }}
                                    onMouseEnter={e => { if (activeChat?.id !== conv.id) e.currentTarget.style.background = 'var(--bg-card-hover)' }}
                                    onMouseLeave={e => { if (activeChat?.id !== conv.id) e.currentTarget.style.background = 'transparent' }}
                                >
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-gradient)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.85rem', fontWeight: 700, color: 'white', flexShrink: 0
                                    }}>{conv.avatar}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{conv.name}</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{conv.time}</span>
                                        </div>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                            fontWeight: conv.unread ? 600 : 400, color: conv.unread ? 'var(--text-secondary)' : 'var(--text-muted)',
                                        }}>{conv.lastMessage}</div>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div style={{
                                            width: 20, height: 20, borderRadius: '50%', background: 'var(--primary)',
                                            color: 'white', fontSize: '0.7rem', fontWeight: 700,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>{conv.unread}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
                        {activeChat ? (
                            <>
                                {/* Chat Header */}
                                <div style={{
                                    padding: '12px 20px', borderBottom: '1px solid var(--border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    background: 'var(--bg-card)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-gradient)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.8rem', fontWeight: 700, color: 'white'
                                        }}>{activeChat.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeChat.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
                                                <span className="availability-dot online" /> Çevrimiçi
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-icon btn-ghost"><Phone size={16} /></button>
                                        <button className="btn btn-icon btn-ghost"><MoreVertical size={16} /></button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {messages.map(msg => (
                                        <div key={msg.id} style={{
                                            display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                        }}>
                                            <div style={{
                                                maxWidth: '70%', padding: '10px 14px', borderRadius: 16,
                                                background: msg.sender === 'me' ? 'var(--primary)' : 'var(--bg-card)',
                                                color: msg.sender === 'me' ? 'white' : 'var(--text)',
                                                border: msg.sender === 'me' ? 'none' : '1px solid var(--border)',
                                                borderBottomRightRadius: msg.sender === 'me' ? 4 : 16,
                                                borderBottomLeftRadius: msg.sender === 'me' ? 16 : 4,
                                            }}>
                                                <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{msg.text}</div>
                                                <div style={{
                                                    fontSize: '0.68rem', marginTop: 4, textAlign: 'right',
                                                    opacity: 0.7,
                                                }}>{msg.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEnd} />
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSend} style={{
                                    padding: '12px 20px', borderTop: '1px solid var(--border)',
                                    display: 'flex', gap: 8, background: 'var(--bg-card)'
                                }}>
                                    <input
                                        className="input"
                                        placeholder="Mesaj yazın..."
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <button className="btn btn-primary" type="submit">
                                        <Send size={16} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.3 }}><MessageCircle size={48} /></div>
                                <p style={{ fontSize: '1rem' }}>Bir sohbet seçin</p>
                                <p style={{ fontSize: '0.85rem' }}>Sol panelden bir kişiyi seçerek mesajlaşmaya başlayın</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
