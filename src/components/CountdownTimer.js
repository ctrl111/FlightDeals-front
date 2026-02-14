'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      
      if (distance < 0) {
        setTimeLeft('Завершено');
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };
    
    updateTimer(); // Немедленное обновление
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  // Предотвращение ошибки гидратации: показывать заполнитель до монтирования на клиенте
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 text-red-500 font-mono font-bold bg-red-50 px-2 py-1 rounded text-xs sm:text-sm">
        <Clock size={14} />
        <span>--h --m --s</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-red-500 font-mono font-bold bg-red-50 px-2 py-1 rounded text-xs sm:text-sm">
      <Clock size={14} />
      <span>{timeLeft || '--h --m --s'}</span>
    </div>
  );
}
