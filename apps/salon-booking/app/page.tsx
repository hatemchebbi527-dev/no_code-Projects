'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Booking {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  price: string;
}

type Lang = 'fr' | 'it';

const TRANSLATIONS = {
  fr: {
    subtitle: 'Coiffure & Beauté — Rimini',
    bookBtn: 'Prendre RDV',
    tagline: 'Rimini, Italie',
    hero1: 'Votre beauté,',
    hero2: 'notre passion',
    heroSub: 'Réservez votre rendez-vous en 2 minutes avec Sofia, notre assistante IA disponible 24h/24.',
    heroCta: 'Réserver maintenant ✨',
    servicesTitle: 'Nos prestations',
    servicesHours: 'Mardi — Samedi · 9h00 – 19h00',
    address: 'Adresse',
    hours: 'Horaires',
    hoursVal: 'Mar–Sam · 9h00–19h00',
    phone: 'Téléphone',
    placeholder: 'Écrivez votre message...',
    confirmed: '✅ Rendez-vous confirmé !',
    smsNote: 'Un SMS de confirmation vous sera envoyé.',
    at: 'à',
    quickReplies: ['Coupe femme', 'Coloration', 'Balayage'],
    botSub: 'Assistante du Salon Éclat',
    errorMsg: 'Désolée, une erreur est survenue. Veuillez réessayer.',
    services: [
      { name: 'Coupe & Brushing Femme', price: '45€', duration: '60 min', icon: '✂️' },
      { name: 'Coupe Homme', price: '22€', duration: '30 min', icon: '💈' },
      { name: 'Couleur complète', price: 'dès 65€', duration: '90 min', icon: '🎨' },
      { name: 'Balayage / Mèches', price: 'dès 85€', duration: '120 min', icon: '✨' },
      { name: 'Soin intensif', price: '35€', duration: '45 min', icon: '💆' },
      { name: 'Lissage kératine', price: 'dès 120€', duration: '150 min', icon: '💫' },
    ],
    greet: 'Bonjour',
  },
  it: {
    subtitle: 'Parrucchiere & Bellezza — Rimini',
    bookBtn: 'Prenota ora',
    tagline: 'Rimini, Italia',
    hero1: 'La vostra bellezza,',
    hero2: 'la nostra passione',
    heroSub: "Prenotate il vostro appuntamento in 2 minuti con Sofia, la nostra assistente IA disponibile 24h/24.",
    heroCta: 'Prenota adesso ✨',
    servicesTitle: 'I nostri servizi',
    servicesHours: 'Martedì — Sabato · 9h00 – 19h00',
    address: 'Indirizzo',
    hours: 'Orari',
    hoursVal: 'Mar–Sab · 9h00–19h00',
    phone: 'Telefono',
    placeholder: 'Scrivi il tuo messaggio...',
    confirmed: '✅ Appuntamento confermato!',
    smsNote: 'Riceverete un SMS di conferma.',
    at: 'alle',
    quickReplies: ['Taglio donna', 'Colorazione', 'Balayage'],
    botSub: 'Assistente del Salon Éclat',
    errorMsg: 'Spiacente, si è verificato un errore. Riprova.',
    services: [
      { name: 'Taglio & Piega Donna', price: '45€', duration: '60 min', icon: '✂️' },
      { name: 'Taglio Uomo', price: '22€', duration: '30 min', icon: '💈' },
      { name: 'Colorazione completa', price: 'da 65€', duration: '90 min', icon: '🎨' },
      { name: 'Balayage / Schiariture', price: 'da 85€', duration: '120 min', icon: '✨' },
      { name: 'Trattamento intensivo', price: '35€', duration: '45 min', icon: '💆' },
      { name: 'Lisciatura alla cheratina', price: 'da 120€', duration: '150 min', icon: '💫' },
    ],
    greet: 'Ciao',
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const switchLang = (newLang: Lang) => {
    if (newLang === lang) return;
    setLang(newLang);
    setMessages([]);
    setBooking(null);
    setIsOpen(false);
  };

  const callApi = async (msgs: Message[], currentLang: Lang) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, lang: currentLang }),
      });
      const data = await res.json();
      const raw: string = data.message || '';

      const bookingMatch = raw.match(/BOOKING_CONFIRMED:(\{[^}]+\})/);
      if (bookingMatch) {
        try { setBooking(JSON.parse(bookingMatch[1])); } catch { /* ignore */ }
      }

      return raw.replace(/BOOKING_CONFIRMED:\{[^}]+\}/, '').trim();
    } catch {
      return TRANSLATIONS[currentLang].errorMsg;
    } finally {
      setIsLoading(false);
    }
  };

  const openChat = async () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting = await callApi([{ role: 'user', content: t.greet }], lang);
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    const reply = await callApi(newMessages, lang);
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl">💇</div>
            <div>
              <h1 className="font-serif text-xl font-bold text-gray-900">Salon Éclat</h1>
              <p className="text-xs text-gray-500">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
              {(['fr', 'it'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    lang === l
                      ? 'bg-white text-rose-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {l === 'fr' ? '🇫🇷 FR' : '🇮🇹 IT'}
                </button>
              ))}
            </div>
            <button
              onClick={openChat}
              className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors shadow-sm"
            >
              {t.bookBtn}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-50 via-rose-100 to-pink-50 py-20 px-6 text-center">
        <p className="text-rose-500 font-medium text-sm tracking-widest uppercase mb-3">{t.tagline}</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.hero1}<br />{t.hero2}
        </h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">{t.heroSub}</p>
        <button
          onClick={openChat}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          {t.heroCta}
        </button>
      </section>

      {/* SERVICES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="font-serif text-2xl font-bold text-center text-gray-900 mb-2">{t.servicesTitle}</h3>
        <p className="text-center text-gray-500 text-sm mb-10">{t.servicesHours}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 hover:shadow-md hover:border-rose-200 transition-all cursor-pointer"
              onClick={openChat}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{s.name}</h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-rose-500 font-bold">{s.price}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFOS */}
      <section className="bg-white border-t border-rose-100 py-12 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">📍</div>
            <p className="font-semibold text-gray-800">{t.address}</p>
            <p className="text-gray-500 text-sm mt-1">Via Roma 42, Rimini</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🕐</div>
            <p className="font-semibold text-gray-800">{t.hours}</p>
            <p className="text-gray-500 text-sm mt-1">{t.hoursVal}</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📞</div>
            <p className="font-semibold text-gray-800">{t.phone}</p>
            <p className="text-gray-500 text-sm mt-1">+39 0541 123 456</p>
          </div>
        </div>
      </section>

      {/* CHAT BUTTON */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition-all hover:scale-110"
          aria-label="Chat"
        >
          💬
        </button>
      )}

      {/* CHAT PANEL */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-rose-100"
          style={{ height: '560px' }}
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
              <div>
                <p className="text-white font-semibold text-sm">Sofia</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
                  <p className="text-white/80 text-xs">{t.botSub}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-xl leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot flex items-center gap-1 px-4 py-3">
                  <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
            )}

            {booking && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-sm">
                <p className="font-semibold text-rose-700 mb-2">{t.confirmed}</p>
                <div className="space-y-1 text-gray-700">
                  <p>👤 <span className="font-medium">{booking.name}</span></p>
                  <p>✂️ {booking.service}</p>
                  <p>📅 {booking.date} {t.at} {booking.time}</p>
                  <p>💰 {booking.price}</p>
                  <p>📱 {booking.phone}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">{t.smsNote}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-4 py-2 flex gap-2 flex-wrap bg-white border-t border-gray-100">
              {t.quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-full px-3 py-1 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-300 disabled:opacity-50 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 text-white rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
