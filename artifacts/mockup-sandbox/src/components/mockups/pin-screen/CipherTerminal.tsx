import React, { useState, useEffect } from 'react';
import './_group.css';

export function CipherTerminal() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bootSequence, setBootSequence] = useState<string[]>([
    "ULTRA-X SECURITY kernel v2.0.4 loaded",
    "Initializing root access protocol...",
    "Establishing secure connection to mainframe...",
    "Connection established."
  ]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Simulate boot sequence typing
    const timer1 = setTimeout(() => setBootSequence(prev => [...prev, "Checking encryption keys... OK"]), 600);
    const timer2 = setTimeout(() => setBootSequence(prev => [...prev, "Awaiting valid authorization token."]), 1200);
    const timer3 = setTimeout(() => setShowPrompt(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleKeyPress = (key: string) => {
    if (error || success || !showPrompt) return;

    if (key === 'DEL') {
      setPin(prev => prev.slice(0, -1));
      return;
    }

    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);

      if (newPin.length === 4) {
        if (newPin === '6969') {
          setSuccess(true);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 1500);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] h-[800px] max-h-[100dvh] bg-black text-[#22c55e] font-mono text-sm sm:text-base relative overflow-hidden terminal-flicker p-6 flex flex-col justify-between mx-auto border border-[#166534]">
      {/* Scanline effect */}
      <div className="terminal-scanline"></div>
      
      {/* Screen glare / vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(0,255,0,0.03) 0%, rgba(0,0,0,0.6) 100%)'
      }}></div>

      {/* Main Terminal Area */}
      <div className="flex-1 overflow-y-auto z-10 flex flex-col">
        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <pre className="text-xs sm:text-sm font-bold text-center">
{`
    ___  __________________  __________ 
   /   |/ ____/ ____/ ____/ / ___/ ___/
  / /| / /   / /   / __/    \\__ \\\\__ \\ 
 / ___ / /___/ /___/ /___   ___/ /__/ / 
/_/  |_\\____/\\____/_____/  /____/____/  
                                        
   ______   ____  ___    _   __________ 
  / ____/  / __ \\/   |  / | / /_  __/ / 
 / / __   / /_/ / /| | /  |/ / / / / /  
/ /_/ /  / _, _/ ___ |/ /|  / / / /_/   
\\____/  /_/ |_/_/  |_/_/ |_/ /_/ (_)    
`}
            </pre>
            <p className="mt-8 text-lg animate-pulse">SYSTEM UNLOCKED. REDIRECTING...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {bootSequence.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            
            {showPrompt && (
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#16a34a]">root@ultrax:~$</span>
                  <span>./authenticate --pin</span>
                </div>
                
                <div className="mt-2 flex items-center h-8">
                  <span className="mr-2">ENTER PIN:</span>
                  <span className="tracking-widest">{pin.replace(/./g, '*')}</span>
                  {(!error && pin.length < 4) && <span className="w-2.5 h-5 bg-[#22c55e] inline-block ml-1 terminal-blink"></span>}
                </div>

                {error && (
                  <div className="mt-4 text-red-500 font-bold">
                    [!] ERROR: ACCESS DENIED — INVALID CREDENTIALS
                    <br />
                    [!] RETRYING...
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terminal-style Keypad */}
      {!success && (
        <div className="z-10 mt-8 mb-4 border-t border-[#166534] pt-6">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                className="h-14 border border-[#166534] hover:bg-[#166534] hover:text-black transition-colors flex items-center justify-center text-xl font-bold focus:outline-none active:bg-[#22c55e] active:scale-95"
              >
                [{num}]
              </button>
            ))}
            <button
              onClick={() => handleKeyPress('DEL')}
              className="h-14 border border-[#166534] hover:bg-red-900/30 text-red-500 hover:text-red-400 hover:border-red-500 transition-colors flex items-center justify-center text-sm font-bold focus:outline-none active:bg-red-500 active:text-black active:scale-95"
            >
              [DEL]
            </button>
            <button
              onClick={() => handleKeyPress('0')}
              className="h-14 border border-[#166534] hover:bg-[#166534] hover:text-black transition-colors flex items-center justify-center text-xl font-bold focus:outline-none active:bg-[#22c55e] active:scale-95"
            >
              [0]
            </button>
            <div className="h-14 border border-[#166534]/30 flex items-center justify-center text-xs text-[#166534]">
              NULL
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
