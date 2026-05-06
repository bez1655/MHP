import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import './_group.css';

const GRID_SIZE = 3;
const DOTS_COUNT = GRID_SIZE * GRID_SIZE;

export function PatternLock() {
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track cursor position for the active drawing line
  const [currentPos, setCurrentPos] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDrawing) {
        finishDrawing();
      }
    };
    
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDrawing, pattern]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (status === 'success') return;
    setIsDrawing(true);
    setPattern([index]);
    setStatus('idle');
    updateCurrentPos(e);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    // Prevent scrolling while drawing on touch devices
    if (e.type === 'touchmove' && e.cancelable) {
      e.preventDefault();
    }
    
    updateCurrentPos(e);
    
    // Find if we're over a dot
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    // We could use elementFromPoint, but doing it mathematically is more reliable
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const dotRadius = 30; // hit area
      const cellWidth = rect.width / GRID_SIZE;
      const cellHeight = rect.height / GRID_SIZE;
      
      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);
      
      if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
        const dotCenterX = col * cellWidth + cellWidth / 2;
        const dotCenterY = row * cellHeight + cellHeight / 2;
        
        const dist = Math.sqrt(Math.pow(x - dotCenterX, 2) + Math.pow(y - dotCenterY, 2));
        
        if (dist < dotRadius) {
          const index = row * GRID_SIZE + col;
          if (!pattern.includes(index)) {
            setPattern(prev => [...prev, index]);
          }
        }
      }
    }
  };

  const updateCurrentPos = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCurrentPos({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    setCurrentPos(null);
    
    if (pattern.length < 4) {
      setStatus('error');
      setTimeout(() => {
        setPattern([]);
        setStatus('idle');
      }, 1000);
    } else {
      setStatus('success');
    }
  };

  const renderLines = () => {
    if (pattern.length === 0 || !containerRef.current) return null;
    
    const lines = [];
    const rect = containerRef.current.getBoundingClientRect();
    const cellWidth = rect.width / GRID_SIZE;
    const cellHeight = rect.height / GRID_SIZE;
    
    const getDotCenter = (index: number) => {
      const col = index % GRID_SIZE;
      const row = Math.floor(index / GRID_SIZE);
      return {
        x: col * cellWidth + cellWidth / 2,
        y: row * cellHeight + cellHeight / 2
      };
    };

    // Draw lines between connected dots
    for (let i = 0; i < pattern.length - 1; i++) {
      const p1 = getDotCenter(pattern[i]);
      const p2 = getDotCenter(pattern[i + 1]);
      
      const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      
      lines.push(
        <div
          key={`line-${i}`}
          className={`absolute h-1 origin-left rounded-full transition-all duration-300 ${
            status === 'error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' :
            status === 'success' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' :
            'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]'
          }`}
          style={{
            left: p1.x,
            top: p1.y - 2, // -2 for half height
            width: length,
            transform: `rotate(${angle}deg)`,
            zIndex: 10
          }}
        />
      );
    }
    
    // Draw line from last dot to current cursor
    if (isDrawing && currentPos && pattern.length > 0) {
      const lastDot = getDotCenter(pattern[pattern.length - 1]);
      const length = Math.sqrt(Math.pow(currentPos.x - lastDot.x, 2) + Math.pow(currentPos.y - lastDot.y, 2));
      const angle = Math.atan2(currentPos.y - lastDot.y, currentPos.x - lastDot.x) * 180 / Math.PI;
      
      lines.push(
        <div
          key="line-active"
          className="absolute h-1 bg-red-600/50 origin-left rounded-full"
          style={{
            left: lastDot.x,
            top: lastDot.y - 2,
            width: length,
            transform: `rotate(${angle}deg)`,
            zIndex: 10
          }}
        />
      );
    }

    return lines;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-geometric-grid flex flex-col items-center justify-center text-white p-6 font-sans select-none overflow-hidden touch-none">
      
      {/* Brand Header */}
      <div className="mb-12 flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          {status === 'success' ? (
            <Unlock className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-white" />
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-[0.2em] text-white/90">ULTRA <span className="text-red-600">X</span> HUB</h1>
      </div>

      {/* Instructions / Status */}
      <div className="h-8 mb-8 flex items-center justify-center">
        {status === 'idle' && (
          <p className="text-zinc-400 text-sm tracking-widest font-medium animate-pulse">DRAW YOUR PATTERN</p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-sm tracking-widest font-bold">PATTERN TOO SHORT</p>
        )}
        {status === 'success' && (
          <p className="text-green-500 text-sm tracking-widest font-bold">ACCESS GRANTED</p>
        )}
      </div>

      {/* Pattern Grid Area */}
      <div 
        className={`relative w-full max-w-[320px] aspect-square ${status === 'error' ? 'animate-shake' : ''}`}
        ref={containerRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseLeave={() => isDrawing && finishDrawing()}
      >
        {/* Render lines first so they are under dots */}
        {renderLines()}
        
        {/* Render 3x3 grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0">
          {Array.from({ length: DOTS_COUNT }).map((_, index) => {
            const isActive = pattern.includes(index);
            const isLast = pattern[pattern.length - 1] === index;
            
            return (
              <div 
                key={index} 
                className="flex items-center justify-center cursor-crosshair relative z-20"
                onMouseDown={(e) => handleStart(e, index)}
                onTouchStart={(e) => handleStart(e, index)}
              >
                {/* Hit area */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full" />
                
                {/* Visual Dot */}
                <div 
                  className={`rounded-full transition-all duration-200 flex items-center justify-center
                    ${isActive ? 'w-6 h-6' : 'w-2.5 h-2.5 bg-zinc-700/50 hover:bg-zinc-600'}
                    ${isActive && status === 'idle' ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-110' : ''}
                    ${isActive && status === 'error' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : ''}
                    ${isActive && status === 'success' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : ''}
                  `}
                >
                  {/* Inner dot for active state */}
                  {isActive && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                  
                  {/* Pulse ring for last dot */}
                  {isLast && isDrawing && (
                    <div className="absolute w-12 h-12 rounded-full border border-red-600/50 animate-ping" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <button className="text-zinc-500 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">
          Forgot Pattern?
        </button>
      </div>

    </div>
  );
}
