'use client';

import { useState } from 'react';
import { 
  Wallet, 
  Coins, 
  Plane, 
  CheckCircle, 
  QrCode, 
  History,
  User,
  Mail,
  Phone,
  Shield,
  Award,
  TrendingUp,
  Clock,
  CreditCard,
  MapPin
} from 'lucide-react';
import { formatRussianDateShort } from '@/utils/dateLocale';

export default function UserProfile({ wallet, myTickets }) {
  const [activeTab, setActiveTab] = useState('orders');

  const userStats = {
    totalFlights: myTickets.length,
    totalSpent: myTickets.reduce((sum, ticket) => sum + ticket.price, 0).toFixed(0),
    memberSince: '2024-02-15',
    rewardPoints: 1250,
    upcomingFlights: myTickets.filter(t => new Date(t.departure) > new Date()).length
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Упрощенное фоновое оформление */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Область заголовка */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200">
              <User size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Личный кабинет</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Мой аккаунт
          </h1>
        </div>

        {/* Статистические карточки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Plane className="text-blue-600" size={18} />
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{userStats.totalFlights}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Рейсов</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="text-blue-600" size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{userStats.totalSpent}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Потрачено</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-blue-600" size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{userStats.rewardPoints}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Баллы</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Clock className="text-blue-600" size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{userStats.upcomingFlights}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Скоро</div>
          </div>
        </div>

        {/* Карточка блокчейн идентификации */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Блокчейн идентификация</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-blue-600" size={18} />
              <span className="font-medium text-gray-900 text-sm">Адрес кошелька (уникальный ID в сети)</span>
            </div>
            <div className="font-mono text-xs text-gray-600 bg-white px-3 py-2 rounded-lg break-all">
              {wallet}
            </div>
            <p className="text-xs text-gray-500 mt-2">Этот адрес является вашим уникальным идентификатором в блокчейне, все записи транзакций общедоступны.</p>
          </div>
        </div>

        {/* Навигация по вкладкам */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-1.5">
          <div className="flex gap-1">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-md font-medium text-xs transition-all ${
                activeTab === 'orders' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Plane size={14} />
              Мои заказы
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-md font-medium text-xs transition-all ${
                activeTab === 'profile' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User size={14} />
              Личная информация
            </button>
          </div>
        </div>

        {/* Содержимое вкладок */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-gray-900">Мои заказы</h3>
              <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Все заказы</option>
                <option>Предстоящие</option>
                <option>Завершенные</option>
              </select>
            </div>

            {myTickets.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plane size={32} className="text-gray-300" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1.5">Нет заказов</h3>
                <p className="text-sm text-gray-500 mb-4">Вы еще не купили ни одного билета, посмотрите рынок.</p>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Просмотреть рынок билетов
                </button>
              </div>
            ) : (
              myTickets.map((ticket) => (
                <div key={ticket.purchaseId} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-200">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle size={10} /> 
                      Подтверждено в блокчейне
                    </span>
                    <span className="text-gray-400 text-xs font-mono flex items-center gap-1">
                      <Shield size={10} />
                      TX: {ticket.txHash}
                    </span>
                  </div>
                  
                  <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                    {/* Информация о рейсе */}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3">
                        <div className="text-center flex-1 min-w-0">
                          <div className="text-lg font-bold text-gray-900 mb-0.5 break-words">{ticket.from.split(' ')[0]}</div>
                          <div className="text-xs text-gray-400 font-mono mb-0.5">{ticket.from.split(' ')[1]}</div>
                          <div className="text-xs text-gray-600">{formatRussianDateShort(ticket.departure)}</div>
                        </div>
                        
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-16 relative">
                            <div className="h-px bg-gray-300"></div>
                            <Plane className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 text-blue-600 bg-white p-0.5" size={18} />
                          </div>
                          <span className="text-xs text-gray-400 mt-2 bg-gray-100 px-2 py-0.5 rounded-full max-w-[120px] break-words text-center">{ticket.airline}</span>
                        </div>
                        
                        <div className="text-center flex-1 min-w-0">
                          <div className="text-lg font-bold text-gray-900 mb-0.5 break-words">{ticket.to.split(' ')[0]}</div>
                          <div className="text-xs text-gray-400 font-mono mb-0.5">{ticket.to.split(' ')[1]}</div>
                          <div className="text-xs text-gray-600">{formatRussianDateShort(ticket.departure)}</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="bg-blue-50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-blue-600">Сумма оплаты</span>
                          <div className="text-sm font-bold text-blue-600 flex items-center gap-1">
                            <Coins size={12} />
                            {ticket.price} NTI
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-600">Класс места</span>
                          <div className="text-sm font-bold text-gray-900">Эконом</div>
                        </div>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="w-full md:w-auto flex md:flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
                      <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-700 transition-all">
                        <QrCode size={14} />
                        Посадочный талон
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 transition-all">
                        <History size={14} />
                        Просмотреть контракт
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-4">Личная информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Имя пользователя</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <User size={14} className="text-gray-400" />
                  <input type="text" value={`Путешественник #${wallet?.slice(2, 6)}`} className="flex-1 bg-transparent outline-none text-sm" readOnly />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <Mail size={14} className="text-gray-400" />
                  <input type="email" placeholder="Не привязано" className="flex-1 bg-transparent outline-none text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Телефон</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <Phone size={14} className="text-gray-400" />
                  <input type="tel" placeholder="Не привязано" className="flex-1 bg-transparent outline-none text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Страна/Регион</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <MapPin size={14} className="text-gray-400" />
                  <select className="flex-1 bg-transparent outline-none text-sm">
                    <option>Россия</option>
                    <option>Китай</option>
                    <option>США</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Сохранить изменения
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
