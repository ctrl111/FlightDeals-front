'use client';

import { useState } from 'react';
import { Shield, Users, Plane, TrendingUp, DollarSign, Search, Filter, Eye, Ban, CheckCircle, XCircle, Building2, AlertTriangle } from 'lucide-react';

export default function AdminPanel({ flights, wallet }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = {
    totalFlights: flights.length,
    activeFlights: flights.filter(f => f.status === 'active').length,
    totalAirlines: new Set(flights.map(f => f.walletAddress)).size,
    totalRevenue: flights.reduce((sum, f) => sum + (f.soldCount || 0) * f.price, 0)
  };

  const airlineGroups = flights.reduce((acc, flight) => {
    const key = flight.walletAddress || 'unknown';
    if (!acc[key]) {
      acc[key] = {
        walletAddress: key,
        airline: flight.airline,
        flights: [],
        totalFlights: 0,
        activeFlights: 0,
        revenue: 0
      };
    }
    acc[key].flights.push(flight);
    acc[key].totalFlights++;
    if (flight.status === 'active') acc[key].activeFlights++;
    acc[key].revenue += (flight.soldCount || 0) * flight.price;
    return acc;
  }, {});

  const airlines = Object.values(airlineGroups);

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
              <Shield size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Системный администратор</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Консоль управления
          </h1>
        </div>

        {/* Статистические карточки */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Plane size={18} className="text-blue-600" />
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalFlights}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Рейсов</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.activeFlights}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Активных</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Building2 size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalAirlines}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Авиакомпаний</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalRevenue}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Доход</div>
          </div>
        </div>

        {/* Карточка блокчейн идентификации */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Идентификация администратора</h3>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-purple-600" size={18} />
              <span className="font-medium text-gray-900 text-sm">Адрес кошелька (суперадминистратор)</span>
            </div>
            <div className="font-mono text-xs text-gray-600 bg-white px-3 py-2 rounded-lg break-all">
              {wallet}
            </div>
            <p className="text-xs text-gray-500 mt-2">Этот адрес имеет высшие системные права и может управлять всеми авиакомпаниями и информацией о рейсах.</p>
          </div>
        </div>

        {/* Управление авиакомпаниями */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
          <div className="bg-blue-600 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <h3 className="text-lg font-bold">Управление авиакомпаниями</h3>
              </div>
              <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                {airlines.length} авиакомпаний
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {airlines.map((airline, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {airline.airline?.substring(0, 2).toUpperCase() || '??'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{airline.airline || 'Неизвестная авиакомпания'}</h4>
                        <p className="text-xs text-gray-400">Зарегистрированная авиакомпания</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium flex items-center gap-1">
                        <Eye size={14} />
                        Просмотреть детали
                      </button>
                      <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium flex items-center gap-1">
                        <Ban size={14} />
                        Отключить
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Опубликованных рейсов</div>
                      <div className="text-lg font-bold text-gray-900">{airline.totalFlights}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">В продаже</div>
                      <div className="text-lg font-bold text-green-600">{airline.activeFlights}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Журнал аудита рейсов */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 px-5 py-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} />
                <h3 className="text-lg font-bold">Журнал аудита системы</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60" size={14} />
                <input 
                  type="text" 
                  placeholder="Поиск рейсов..." 
                  className="w-full pl-8 pr-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/50 outline-none text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all" className="text-gray-900 bg-white">Все статусы</option>
                <option value="active" className="text-gray-900 bg-white">В продаже</option>
                <option value="inactive" className="text-gray-900 bg-white">Снято с продажи</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-600">
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Авиакомпания</th>
                  <th className="px-4 py-3 font-semibold">Маршрут</th>
                  <th className="px-4 py-3 font-semibold">Цена</th>
                  <th className="px-4 py-3 font-semibold">Время вылета</th>
                  <th className="px-4 py-3 font-semibold">Статус</th>
                  <th className="px-4 py-3 font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(f => (
                  <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-gray-500">#{f.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{f.airline}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-xs break-words max-w-[90px]">{f.from.split(' ')[0]}</span>
                        <span className="text-gray-400 flex-shrink-0">→</span>
                        <span className="font-medium text-xs break-words max-w-[90px]">{f.to.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-blue-600">{f.price} NTI</td>
                    <td className="px-4 py-3 text-gray-600">{f.departure?.split('T')[0] || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {f.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          <CheckCircle size={10} />
                          В продаже
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          <XCircle size={10} />
                          Снято с продажи
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
