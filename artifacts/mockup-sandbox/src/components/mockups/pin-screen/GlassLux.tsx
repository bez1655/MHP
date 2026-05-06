import React, { useState, useEffect } from "react";
import { Check, Delete } from "lucide-react";

export function GlassLux() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const CORRECT_PIN = "6969";

  const handleKeyPress = (key: string) => {
    if (error || success) return;
    
    if (key === "del") {
      setPin((prev) => prev.slice(0, -1));
      return;
    }

    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setSuccess(true);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setPin("");
          }, 800);
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@200;300;400&display=swap');
        
        .font-luxury {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-luxury-sans {
          font-family: 'Inter', sans-serif;
        }

        .bg-gradient-luxury {
          background: radial-gradient(circle at 50% 120%, rgba(45, 12, 63, 0.8) 0%, rgba(10, 5, 15, 1) 60%, #000 100%);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            0 30px 60px -12px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-button:active {
          background: rgba(255, 255, 255, 0.08);
          transform: scale(0.96);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
          animation: float 20s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, -50px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .shake-animation {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .gold-accent {
          color: #d4af37;
        }
        
        .gold-border {
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .gold-bg {
          background-color: #d4af37;
        }

        .fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-luxury z-0" />
      <div className="orb bg-purple-900 w-[500px] h-[500px] -top-[100px] -left-[100px]" />
      <div className="orb bg-indigo-900 w-[400px] h-[400px] bottom-[-50px] right-[-100px] animation-delay-2000" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className={`relative z-10 w-full max-w-sm px-6 flex flex-col items-center justify-center fade-in`}>
        
        <div className={`glass-panel w-full p-10 rounded-3xl flex flex-col items-center transition-all duration-1000 ${error ? 'shake-animation bg-red-950/10 border-red-500/20' : ''} ${success ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
          
          <div className="flex flex-col items-center mb-12">
            <h1 className="font-luxury text-4xl tracking-widest text-white/90 uppercase mb-2">Ultra X</h1>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
            <p className="font-luxury-sans text-xs tracking-[0.3em] text-white/40 mt-3 uppercase">Private Access</p>
          </div>

          <div className="flex space-x-6 mb-12">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full border transition-all duration-500 ease-out
                  ${pin.length > i 
                    ? 'gold-bg border-transparent scale-100 shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                    : 'border-white/20 scale-90'
                  }
                  ${error ? 'border-red-500/40 bg-red-500/20 shadow-none' : ''}
                `}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-6 w-full max-w-[260px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="glass-button w-16 h-16 rounded-full flex items-center justify-center font-luxury-sans font-light text-2xl text-white/80 mx-auto group"
              >
                <span className="group-hover:text-white group-hover:scale-110 transition-all duration-300">{num}</span>
              </button>
            ))}
            <div />
            <button
              onClick={() => handleKeyPress('0')}
              className="glass-button w-16 h-16 rounded-full flex items-center justify-center font-luxury-sans font-light text-2xl text-white/80 mx-auto group"
            >
              <span className="group-hover:text-white group-hover:scale-110 transition-all duration-300">0</span>
            </button>
            <button
              onClick={() => handleKeyPress('del')}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors mx-auto"
            >
              <Delete size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Success State */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 delay-300 ${success ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'}`}>
          <div className="glass-panel w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <Check size={40} className="gold-accent" strokeWidth={1.5} />
          </div>
          <h2 className="font-luxury text-3xl tracking-[0.2em] text-white/90 uppercase mb-3">Welcome</h2>
          <p className="font-luxury-sans text-xs tracking-widest text-[#d4af37]/80 uppercase">Access Granted</p>
        </div>

      </div>
    </div>
  );
}
