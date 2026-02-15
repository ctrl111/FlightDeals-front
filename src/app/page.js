'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import LandingPage from '@/components/LandingPage';
import Marketplace from '@/components/Marketplace';
import UserProfile from '@/components/UserProfile';
import AirlineDashboard from '@/components/AirlineDashboard';
import AdminPanel from '@/components/AdminPanel';
import BookingPage from '@/components/BookingPage';
import { INITIAL_FLIGHTS } from '@/data/mockData';
import { getUserRole, canAccessPage } from '@/utils/roleManager';
import { getRoleDisplayName } from '@/utils/helpers';

export default function App() {
  const [flights, setFlights] = useState(INITIAL_FLIGHTS);
  const [wallet, setWallet] = useState(null);
  const [view, setView] = useState('landing'); // 默认显示首页
  const [role, setRole] = useState('user');
  const [notification, setNotification] = useState(null);
  const [myTickets, setMyTickets] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null); // Выбранный рейс для бронирования

  useEffect(() => {
    if (role === 'user' && (view === 'dashboard' || view === 'admin')) {
      setView('marketplace');
    }
  }, [role, view]);

  const showNotification = (msg, type = 'info') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleConnect = async () => {
    // Имитация подключения кошелька
    setTimeout(async () => {
      const mockAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      setWallet(mockAddress);
      
      // Запрос роли пользователя
      const userRole = await getUserRole(mockAddress);
      setRole(userRole);
      
      showNotification(`Добро пожаловать! Роль: ${getRoleDisplayName(userRole)}`, 'success');
      setView('marketplace'); // 连接后跳转到市场
    }, 800);
  };

  const handleDisconnect = () => {
    setWallet(null);
    setRole('user');
    showNotification('Кошелек отключен');
    setView('landing'); // 断开连接后返回首页
  };

  // Демо-режим: ручное переключение ролей
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    showNotification(`Переключено на: ${getRoleDisplayName(newRole)}`, 'info');
  };

  const handleAddFlight = (newFlight) => {
    const flight = {
      ...newFlight,
      id: Date.now(),
      status: 'active',
      soldCount: 0
    };
    setFlights([flight, ...flights]);
    showNotification('Рейс опубликован в блокчейне', 'success');
    setTimeout(() => setView('marketplace'), 1000);
  };

  const handleBuy = (flight) => {
    if (!wallet) {
      showNotification('Сначала подключите кошелек для бронирования билета', 'error');
      // Можно перейти к подсказке о подключении кошелька
      setTimeout(() => {
        showNotification('Нажмите кнопку подключения кошелька в правом верхнем углу', 'info');
      }, 1500);
      return;
    }
    setSelectedFlight(flight);
    setView('booking');
  };

  const handleConfirmBooking = (flight, passengerInfo) => {
    const newTicket = {
      ...flight,
      ...passengerInfo,
      purchaseId: Date.now(),
      purchaseDate: new Date().toISOString(),
      txHash: '0x' + Math.random().toString(16).substr(2, 64),
      status: 'confirmed'
    };
    
    // Обновление количества продаж рейса
    setFlights(flights.map(f => 
      f.id === flight.id 
        ? { ...f, soldCount: (f.soldCount || 0) + 1 }
        : f
    ));
    
    setMyTickets([newTicket, ...myTickets]);
    showNotification(`Успешная покупка: ${flight.from} -> ${flight.to}`, 'success');
    setView('marketplace');
    setSelectedFlight(null);
  };

  const handleBackFromBooking = () => {
    setView('marketplace');
    setSelectedFlight(null);
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
          />
        )}
        <LandingPage onConnect={handleConnect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}

      <Navbar 
        wallet={wallet} 
        onDisconnect={handleDisconnect} 
        role={role}
        setRole={handleRoleChange}
        setView={setView}
        currentView={view}
        onConnect={handleConnect}
      />

      <main className="pb-12">
        {view === 'marketplace' && (
          <Marketplace flights={flights} onBuy={handleBuy} wallet={wallet} />
        )}

        {view === 'booking' && selectedFlight && (
          <BookingPage 
            flight={selectedFlight} 
            onBack={handleBackFromBooking}
            onConfirm={handleConfirmBooking}
            wallet={wallet}
          />
        )}

        {view === 'profile' && (
          <UserProfile wallet={wallet} myTickets={myTickets} />
        )}
        
        {view === 'dashboard' && role === 'airline' && (
          <AirlineDashboard 
            onAddFlight={handleAddFlight} 
            wallet={wallet}
            flights={flights}
          />
        )}
        
        {view === 'admin' && role === 'admin' && (
          <AdminPanel 
            flights={flights}
            wallet={wallet}
          />
        )}

        {((view === 'dashboard' && role !== 'airline') || (view === 'admin' && role !== 'admin')) && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShieldCheck size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400">Доступ ограничен</h2>
            <p className="text-gray-400 mt-2">Переключитесь на правильную роль для просмотра этой страницы</p>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 FlightDeals. Построено на блокчейне.</p>
        </div>
      </footer>
    </div>
  );
}
