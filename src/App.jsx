import React, { useState, useEffect } from 'react';
import { Lock, Home, Globe, Heart, Search, Flame, Star, ShieldAlert, Fingerprint, ChevronRight, PlayCircle } from 'lucide-react';

// --- MOCK DATA ---
const SITES = [
  { id: 1, name: "PornHub Premium", desc: "Главный хаб. Охуенное качество, миллионы видео для тех, кто любит пожестче и без рекламы.", color: "text-orange-500", tags: ["Premium", "All", "4K"] },
  { id: 2, name: "Brazzers", desc: "Эталонный ебливый глянец. Лучшие порнозвезды в самых горячих и качественных сценах.", color: "text-blue-500", tags: ["Studio", "Brazzers", "HD"] },
  { id: 3, name: "XNXX", desc: "Грязь, хардкор и тонны любительщины. Без купюр и ебучей цензуры, прямиком из спален.", color: "text-blue-400", tags: ["Amateur", "Hardcore"] },
  { id: 4, name: "Eporner", desc: "60 FPS 4K. Для эстетов, которым важно видеть каждую каплю пота на разъебанном очке.", color: "text-gray-300", tags: ["60FPS", "4K", "Free"] },
  { id: 5, name: "SpankBang", desc: "Огромная свалка крутого дерьма. От ванильных потрахушек до лютого пиздеца.", color: "text-red-500", tags: ["Tube", "Wild"] },
  { id: 6, name: "Nympho", desc: "Эксклюзивный BDSM и фетиш. Только для тех, у кого реально больные и грязные фантазии.", color: "text-purple-500", tags: ["BDSM", "Fetish"] }
];

// --- COMPONENTS ---

// 1. PIN Screen
const PinScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '6969') {
          onUnlock();
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0A0A0A] text-white p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff1744] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-12 flex flex-col items-center">
        <ShieldAlert size={64} className="text-[#ff1744] mb-4 animate-pulse" />
        <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#ff1744] to-purple-600 uppercase">
          Ultra X Hub
        </h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Premium Adult Access</p>
      </div>

      <div className="flex space-x-4 mb-12">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              pin.length > i
                ? 'bg-[#ff1744] shadow-[0_0_10px_#ff1744]'
                : error ? 'bg-red-800' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>

      <p className={`mb-8 h-6 text-sm font-bold ${error ? 'text-[#ff1744]' : 'text-transparent'}`}>
        ХУЁВЫЙ ПАРОЛЬ. ДАВАЙ ЗАНОВО.
      </p>

      <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num.toString())}
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-light text-white bg-white/5 active:bg-[#ff1744]/20 active:text-[#ff1744] transition-all border border-white/5"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => {}}
          className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 active:text-[#ff1744] transition-all"
        >
          <Fingerprint size={32} />
        </button>
        <button
          onClick={() => handlePress('0')}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-light text-white bg-white/5 active:bg-[#ff1744]/20 active:text-[#ff1744] transition-all border border-white/5"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="w-20 h-20 rounded-full flex items-center justify-center text-gray-500 active:text-white transition-all text-xl font-bold uppercase"
        >
          DEL
        </button>
      </div>

      <p className="text-gray-600 text-xs mt-auto">Для входа введи 6969</p>
    </div>
  );
};

// 2. Site Card
const SiteCard = ({ site }) => (
  <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 mb-4 shadow-lg relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-[#ff1744]/0 to-[#ff1744]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="flex justify-between items-start mb-2">
      <h3 className={`text-xl font-bold ${site.color}`}>{site.name}</h3>
      <button className="text-gray-600 hover:text-[#ff1744] transition-colors">
        <Heart size={20} />
      </button>
    </div>

    <div className="flex flex-wrap gap-2 mb-3">
      {site.tags.map((tag, idx) => (
        <span key={idx} className="bg-white/10 text-gray-300 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold">
          {tag}
        </span>
      ))}
    </div>

    <p className="text-gray-400 text-sm leading-relaxed mb-4">
      {site.desc}
    </p>

    <button className="w-full bg-white/5 hover:bg-[#ff1744]/10 border border-[#ff1744]/30 text-[#ff1744] rounded-xl py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all">
      <PlayCircle size={18} />
      Смотреть дерьмо
    </button>
  </div>
);

// 3. Main Views
const HomeView = () => (
  <div className="p-4 pb-24 h-full overflow-y-auto">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-black text-white">ГОРЯЧЕЕ</h2>
        <p className="text-[#ff1744] text-sm font-bold tracking-widest uppercase">Ебашим по хардкору</p>
      </div>
      <Flame className="text-[#ff1744]" size={32} />
    </div>

    <div className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide">
      {['Все', 'Новинки', 'Premium', 'BDSM', 'OnlyFans'].map((cat, i) => (
        <button
          key={i}
          className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all ${
            i === 0
            ? 'bg-[#ff1744] text-white shadow-[0_0_15px_rgba(255,23,68,0.4)]'
            : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    <div className="space-y-2">
      {SITES.map(site => <SiteCard key={site.id} site={site} />)}
    </div>
  </div>
);

const SearchView = () => (
  <div className="p-4 pb-24 h-full overflow-y-auto">
    <h2 className="text-3xl font-black text-white mb-6">ПОИСК</h2>
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-500" />
      </div>
      <input
        type="text"
        className="w-full bg-[#121212] border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#ff1744] transition-colors shadow-inner"
        placeholder="Ищи грязное порно..."
      />
    </div>
    <div className="mb-4">
      <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-4">Популярные запросы ебланов:</h3>
      <div className="flex flex-wrap gap-2">
        {['Step-sister', 'Milf hardcore', 'Anal creampie', 'Rough gangbang', 'Russian teens'].map((tag, i) => (
          <span key={i} className="bg-white/5 text-gray-300 px-3 py-2 rounded-lg text-sm border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// 4. App Shell
export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!isUnlocked) {
    return (
      <div className="bg-[#0A0A0A] w-full min-h-screen flex justify-center font-sans">
        <div className="w-full max-w-md h-screen">
          <PinScreen onUnlock={() => setIsUnlocked(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] w-full min-h-screen text-white flex justify-center font-sans">
      <div className="w-full max-w-md bg-[#0A0A0A] h-screen relative shadow-2xl overflow-hidden flex flex-col border-x border-white/5">

        {/* Header */}
        <header className="pt-6 pb-4 px-4 flex justify-between items-center border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff1744] flex items-center justify-center shadow-[0_0_10px_rgba(255,23,68,0.5)]">
              <span className="font-black text-white text-lg">X</span>
            </div>
            <span className="font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              ULTRA
            </span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <Star size={18} className="text-[#ff1744]" />
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-hidden relative">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'search' && <SearchView />}
          {activeTab === 'sites' && (
            <div className="p-4 flex items-center justify-center h-full text-gray-500">
              <p className="text-center">Здесь будет ебучий список из 84 сайтов.<br/>Кастомный WebView готов к работе.</p>
            </div>
          )}
          {activeTab === 'favorites' && (
            <div className="p-4 flex items-center justify-center h-full text-gray-500">
              <p className="text-center">Твои любимые шлюхи и видосы сохраняются тут.</p>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-[#0d0d0d] border-t border-white/10 pb-6 pt-3 px-6 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-20">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#ff1744]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Home size={24} className={activeTab === 'home' ? 'drop-shadow-[0_0_8px_rgba(255,23,68,0.8)]' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('sites')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'sites' ? 'text-[#ff1744]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Globe size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Сайты</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'search' ? 'text-[#ff1744]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Search size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Поиск</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'favorites' ? 'text-[#ff1744]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Heart size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Схрон</span>
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}
