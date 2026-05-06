import React, { useState, useEffect } from "react";
import { Fingerprint, Delete, ShieldCheck, AlertCircle, Fingerprint as FingerprintIcon } from "lucide-react";
import "./_group.css";

export function BiometricTech() {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const CORRECT_PIN = "6969";
  const PIN_LENGTH = 4;

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      if (pin === CORRECT_PIN) {
        setStatus("success");
      } else {
        setStatus("error");
        setTimeout(() => {
          setPin("");
          setStatus("idle");
        }, 1000);
      }
    }
  }, [pin]);

  const handleKeyPress = (num: string) => {
    if (pin.length < PIN_LENGTH && status === "idle") {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    if (status === "idle") {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0c10] text-[#66fcf1] p-4 tech-grid relative overflow-hidden font-mono">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(102,252,241,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center space-y-8 animate-in zoom-in duration-500">
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border border-[#66fcf1] bg-[#66fcf1]/10 shadow-[0_0_30px_rgba(102,252,241,0.3)]">
            <ShieldCheck className="w-16 h-16 text-[#66fcf1]" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-[0.2em] uppercase shadow-[#66fcf1] drop-shadow-[0_0_8px_rgba(102,252,241,0.8)]">Access Granted</h2>
            <p className="text-[#45a29e] tracking-widest text-sm uppercase">Welcome to Ultra X Hub</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#0b0c10] text-[#66fcf1] p-6 tech-grid font-mono relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#45a29e] opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#45a29e] opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#45a29e] opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#45a29e] opacity-50" />

      {/* Header */}
      <div className="w-full flex justify-between items-start mt-8 relative z-10">
        <div className="space-y-1">
          <h1 className="text-xs text-[#45a29e] uppercase tracking-widest font-bold">Terminal / SEC-09</h1>
          <p className="text-[10px] text-gray-500 tracking-wider">Awaiting biometric input</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#66fcf1] animate-pulse" />
          <span className="text-xs text-[#66fcf1] tracking-wider">SYS.ONLINE</span>
        </div>
      </div>

      {/* Scanner Area */}
      <div className={`relative flex items-center justify-center my-12 ${status === 'error' ? 'animate-shake' : ''}`}>
        {/* Rotating outer rings */}
        <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#45a29e]/40 animate-spin-slow" />
        <div className="absolute w-56 h-56 rounded-full border border-[#45a29e]/20 animate-spin-reverse" />
        <div className="absolute w-64 h-64 rounded-full border-t border-b border-[#66fcf1]/30 animate-spin-slow" />
        
        {/* Pulsing glow background */}
        <div className="absolute w-40 h-40 rounded-full bg-[#66fcf1]/5 animate-pulse-ring blur-xl" />

        {/* Fingerprint container */}
        <div className={`relative z-10 w-32 h-32 flex items-center justify-center rounded-full border-2 
          ${status === 'error' ? 'border-red-500 bg-red-500/10' : 'border-[#66fcf1] bg-[#66fcf1]/10'}`}>
          <FingerprintIcon 
            className={`w-16 h-16 ${status === 'error' ? 'text-red-500' : 'text-[#66fcf1]'}`}
            strokeWidth={1.5}
          />
          {status === 'idle' && (
            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden">
              <div className="w-full h-1 bg-[#66fcf1] shadow-[0_0_10px_#66fcf1] animate-scan-line" />
            </div>
          )}
        </div>
      </div>

      {/* PIN Indicators */}
      <div className="flex space-x-4 mb-8">
        {[...Array(PIN_LENGTH)].map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-none rotate-45 transition-all duration-300 ${
              i < pin.length 
                ? 'bg-[#66fcf1] shadow-[0_0_10px_#66fcf1]' 
                : 'bg-transparent border border-[#45a29e] opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      <div className={`h-6 mb-4 flex items-center justify-center text-xs tracking-widest uppercase transition-opacity duration-300
        ${status === 'error' ? 'opacity-100 text-red-500 animate-glitch' : 'opacity-0'}`}>
        <AlertCircle className="w-4 h-4 mr-2" />
        Access Denied
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-[280px] mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            disabled={status !== "idle"}
            className="group relative flex items-center justify-center h-16 w-full text-2xl font-light text-[#66fcf1] 
                       bg-[#0b0c10] border border-[#45a29e]/30 hover:border-[#66fcf1] hover:bg-[#66fcf1]/10 
                       transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {num}
            <div className="absolute top-1 left-1 w-1 h-1 bg-[#45a29e]/50" />
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#45a29e]/50" />
          </button>
        ))}
        <div /> {/* Empty cell */}
        <button
          onClick={() => handleKeyPress("0")}
          disabled={status !== "idle"}
          className="group relative flex items-center justify-center h-16 w-full text-2xl font-light text-[#66fcf1] 
                     bg-[#0b0c10] border border-[#45a29e]/30 hover:border-[#66fcf1] hover:bg-[#66fcf1]/10 
                     transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          0
          <div className="absolute top-1 left-1 w-1 h-1 bg-[#45a29e]/50" />
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#45a29e]/50" />
        </button>
        <button
          onClick={handleDelete}
          disabled={status !== "idle" || pin.length === 0}
          className="group relative flex items-center justify-center h-16 w-full text-[#45a29e] 
                     bg-[#0b0c10] border border-[#45a29e]/30 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 
                     transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        >
          <Delete className="w-6 h-6" />
          <div className="absolute top-1 left-1 w-1 h-1 bg-[#45a29e]/50 group-hover:bg-red-500/50" />
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#45a29e]/50 group-hover:bg-red-500/50" />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto text-[10px] text-[#45a29e]/50 tracking-[0.3em] uppercase">
        V. 1.0.4 // Biometric Security
      </div>
    </div>
  );
}
