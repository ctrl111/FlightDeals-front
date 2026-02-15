'use client';

import { useState } from 'react';
import { LayoutDashboard, Coins, Plus, Plane, Calendar, Clock, TrendingUp, DollarSign, Edit, Trash2, Eye, Building2, Shield } from 'lucide-react';
import { getMinDate, getMaxDate } from '@/utils/dateLocale';

export default function AirlineDashboard({ onAddFlight, wallet, flights }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    price: '',
    originalPrice: '',
    discount: '0',
    deadlineHours: '12',
    departure: '',
    arrival: '', // 到达时间
    companyName: '',
    cabinClass: 'economy',
    hasBaggage: true,
    refundable: false
  });

  const myFlights = flights.filter(f => f.walletAddress === wallet);

  const stats = {
    totalFlights: myFlights.length,
    activeListings: myFlights.filter(f => f.status === 'active').length,
    totalRevenue: myFlights.reduce((sum, f) => sum + (f.soldCount || 0) * f.price, 0),
    avgPrice: myFlights.length > 0 ? (myFlights.reduce((sum, f) => sum + f.price, 0) / myFlights.length).toFixed(0) : 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.price || !formData.companyName || !formData.departure || !formData.arrival) {
      return;
    }
    
    // 计算飞行时长
    const departureTime = new Date(formData.departure);
    const arrivalTime = new Date(formData.arrival);
    const duration = Math.round((arrivalTime - departureTime) / 60000); // 转换为分钟
    
    // 计算实际价格和原价
    const actualPrice = parseFloat(formData.price);
    const discount = parseFloat(formData.discount) || 0;
    const originalPrice = formData.originalPrice ? parseFloat(formData.originalPrice) : (discount > 0 ? Math.round(actualPrice / (1 - discount / 100)) : actualPrice);
    
    onAddFlight({
      from: formData.from,
      to: formData.to,
      price: actualPrice,
      originalPrice: originalPrice,
      discount: discount,
      airline: formData.companyName,
      departure: formData.departure,
      arrival: formData.arrival,
      duration: duration,
      deadline: new Date(Date.now() + parseFloat(formData.deadlineHours) * 3600000).toISOString(),
      walletAddress: wallet,
      cabinClass: formData.cabinClass,
      hasBaggage: formData.hasBaggage,
      refundable: formData.refundable,
      soldCount: 0
    });
    setFormData({ 
      from: '', 
      to: '', 
      price: '', 
      originalPrice: '',
      discount: '0',
      deadlineHours: '12',
      departure: '',
      arrival: '',
      companyName: '',
      cabinClass: 'economy',
      hasBaggage: true,
      refundable: false
    });
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
              <Building2 size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Консоль авиакомпании</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление рейсами
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
              <Clock size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.activeListings}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Активных</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.totalRevenue}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Доход</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Coins size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{stats.avgPrice}</div>
            <div className="text-xs text-gray-600 whitespace-nowrap">Средняя</div>
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
            <p className="text-xs text-gray-500 mt-2">Этот адрес является вашим уникальным идентификатором в блокчейне, все записи публикации рейсов общедоступны.</p>
          </div>
        </div>

        {/* Форма публикации */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
          <div className="bg-blue-600 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Опубликовать новый рейс</h2>
                <p className="text-xs text-blue-100">Создать неизменяемый смарт-контракт билета</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Название авиакомпании
                </label>
                <input 
                  type="text" 
                  placeholder="Например: SkyWings Airlines" 
                  className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Откуда
                  </label>
                  <input 
                    type="text" 
                    placeholder="Например: Москва (SVO)" 
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.from}
                    onChange={e => setFormData({...formData, from: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Куда
                  </label>
                  <input 
                    type="text" 
                    placeholder="Например: Санкт-Петербург (LED)" 
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.to}
                    onChange={e => setFormData({...formData, to: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Дата и время вылета
                  </label>
                  <input 
                    type="datetime-local" 
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.departure}
                    onChange={e => setFormData({...formData, departure: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Дата и время прибытия
                  </label>
                  <input 
                    type="datetime-local" 
                    min={formData.departure || getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.arrival}
                    onChange={e => setFormData({...formData, arrival: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Текущая цена (NTI)
                  </label>
                  <input 
                    type="number" 
                    step="1" 
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-semibold" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Исходная цена (NTI) <span className="text-gray-400 font-normal">опционально</span>
                  </label>
                  <input 
                    type="number" 
                    step="1" 
                    placeholder="Оставьте пустым для автоматического расчета"
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                    value={formData.originalPrice} 
                    onChange={e => setFormData({...formData, originalPrice: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Скидка (%)
                  </label>
                  <input 
                    type="number" 
                    step="1" 
                    min="0"
                    max="99"
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                    value={formData.discount} 
                    onChange={e => setFormData({...formData, discount: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Срок продажи (часы)
                </label>
                <input 
                  type="number" 
                  min="1"
                  max="20"
                  step="1"
                  placeholder="1-20 часов"
                  className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                  value={formData.deadlineHours} 
                  onChange={e => {
                    const value = Math.min(20, Math.max(1, parseInt(e.target.value) || 1));
                    setFormData({...formData, deadlineHours: value.toString()});
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Установите срок окончания продажи в течение 1-20 часов</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Класс салона
                  </label>
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                    value={formData.cabinClass} 
                    onChange={e => setFormData({...formData, cabinClass: e.target.value})}
                  >
                    <option value="economy">Эконом</option>
                    <option value="business">Бизнес</option>
                    <option value="first">Первый класс</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    С багажом
                  </label>
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                    value={formData.hasBaggage} 
                    onChange={e => setFormData({...formData, hasBaggage: e.target.value === 'true'})}
                  >
                    <option value="true">С багажом</option>
                    <option value="false">Без багажа</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Политика возврата
                  </label>
                  <select 
                    className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                    value={formData.refundable} 
                    onChange={e => setFormData({...formData, refundable: e.target.value === 'true'})}
                  >
                    <option value="false">Невозвратный</option>
                    <option value="true">Возвратный (требуется на сайте)</option>
                  </select>
                </div>
              </div>

              {formData.from && formData.to && formData.price && formData.companyName && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 relative overflow-hidden">
                  {formData.discount > 0 && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                        -{formData.discount}%
                      </span>
                    </div>
                  )}
                  <div className="text-xs font-semibold text-blue-600 mb-2">📋 Предпросмотр публикации</div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-gray-900">{formData.from}</div>
                    <Plane className="text-blue-500 rotate-90" size={18} />
                    <div className="text-lg font-bold text-gray-900">{formData.to}</div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{formData.companyName}</div>
                      <div className="text-lg font-bold text-blue-600 flex items-center gap-1">
                        <Coins size={16} />
                        {formData.price} NTI
                      </div>
                      {(formData.originalPrice || formData.discount > 0) && (
                        <div className="text-xs text-gray-400 line-through">
                          {formData.originalPrice || Math.round(formData.price / (1 - formData.discount / 100))} NTI
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-medium">
                      {formData.cabinClass === 'economy' ? 'Эконом' : formData.cabinClass === 'business' ? 'Бизнес' : 'Первый класс'}
                    </span>
                    {formData.hasBaggage && (
                      <span className="px-2 py-1 bg-white text-blue-700 rounded text-xs font-medium">
                        С багажом
                      </span>
                    )}
                    {formData.refundable && (
                      <span className="px-2 py-1 bg-white text-green-700 rounded text-xs font-medium">
                        Возвратный
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">💡 Подсказка: Когда количество продаж достигнет 10 билетов, система автоматически пометит рейс как популярный</p>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Plus size={18} /> 
                Опубликовать в блокчейн
              </button>
            </form>
          </div>
        </div>

        {/* Список моих рейсов */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Мои опубликованные рейсы</h3>
          </div>
          <div className="p-5">
            {myFlights.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Plane size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Еще не опубликовано ни одного рейса</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myFlights.map(flight => {
                  const isHot = (flight.soldCount || 0) >= 10;
                  return (
                    <div key={flight.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all relative">
                      {isHot && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            🔥 Популярно
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 break-words">{flight.from.split(' ')[0]}</div>
                            <div className="text-xs text-gray-400">{flight.from.split(' ')[1]}</div>
                          </div>
                          <Plane className="text-blue-500 rotate-90 flex-shrink-0" size={16} />
                          <div className="text-center flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 break-words">{flight.to.split(' ')[0]}</div>
                            <div className="text-xs text-gray-400">{flight.to.split(' ')[1]}</div>
                          </div>
                          <div className="ml-4">
                            <div className="text-xs text-gray-500">Цена</div>
                            <div className="text-base font-bold text-blue-600">{flight.price} NTI</div>
                          </div>
                          <div className="ml-4">
                            <div className="text-xs text-gray-500">Продано</div>
                            <div className="text-base font-bold text-gray-900">{flight.soldCount || 0} билетов</div>
                          </div>
                          <div className="ml-4">
                            <div className="text-xs text-gray-500">Статус</div>
                            <div className={`text-xs font-medium ${flight.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                              {flight.status === 'active' ? 'В продаже' : 'Снято с продажи'}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
