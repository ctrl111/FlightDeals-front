'use client';

import { CheckCircle, Wallet } from 'lucide-react';

export default function Notification({ message, type }) {
  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-600';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce-in z-50`}>
      {type === 'success' ? <CheckCircle size={20} /> : <Wallet size={20} />}
      <span>{message}</span>
    </div>
  );
}
