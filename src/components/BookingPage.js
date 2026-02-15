'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Plane, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Coins,
  ShieldCheck,
  MapPin,
  Calendar
} from 'lucide-react';
import { formatRussianDateShort, formatTime, formatDuration } from '@/utils/dateLocale';

export default function BookingPage({ flight, onBack, onConfirm, wallet }) {
  const [step, setStep] = useState(1); // 1: Информация, 2: Подтверждение оплаты, 3: Успешная оплата
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    dateOfBirth: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    // Имитация блокчейн транзакции
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      // 3 секунды спустя вызвать обратный вызов подтверждения
      setTimeout(() => {
        onConfirm(flight, passengerInfo);
      }, 3000);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16 relative z-10">
          <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-2xl border border-green-100 p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg animate-bounce">
              <CheckCircle className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">🎉 Бронирование завершено!</h2>
            <p className="text-sm text-gray-600 mb-8">
              Ваш билет успешно забронирован и записан в блокчейн. Транзакция неизменна.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 mb-6 border border-blue-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="text-blue-600" size={20} />
                <span className="text-sm font-bold text-gray-900">Хэш транзакции блокчейна</span>
              </div>
              <div className="font-mono text-xs text-gray-600 break-all bg-white px-4 py-3 rounded-lg shadow-sm">
                0x{Math.random().toString(16).substr(2, 64)}
              </div>
              <p className="text-xs text-gray-500 mt-3">Эта транзакция навсегда записана в блокчейне и может быть проверена в любое время</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onBack}
                className="flex-1 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all font-semibold text-sm shadow-sm"
              >
                Вернуться на рынок
              </button>
              <button 
                className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm shadow-lg"
              >
                Посмотреть мои заказы
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
        {/* Кнопка возврата */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Вернуться на рынок
        </button>

        {/* Индикатор шагов - более изысканный дизайн */}
        <div className="bg-gradient-to-r from-white to-blue-50/30 rounded-xl shadow-md border border-blue-100 p-5 mb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= 1 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className={`text-sm font-semibold ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Информация
              </span>
            </div>
            <div className={`h-1 w-20 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-300'}`}></div>
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= 2 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={`text-sm font-semibold ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                Оплата
              </span>
            </div>
            <div className={`h-1 w-20 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-300'}`}></div>
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= 3 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className={`text-sm font-semibold ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                Готово
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая сторона: форма */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Информация о пассажире</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Имя</label>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <User size={14} className="text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Имя"
                          className="flex-1 bg-transparent outline-none text-sm"
                          value={passengerInfo.firstName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Фамилия</label>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <User size={14} className="text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Фамилия"
                          className="flex-1 bg-transparent outline-none text-sm"
                          value={passengerInfo.lastName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      <Mail size={14} className="text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="flex-1 bg-transparent outline-none text-sm"
                        value={passengerInfo.email}
                        onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Телефон</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      <Phone size={14} className="text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="+7 XXX XXX XXXX"
                        className="flex-1 bg-transparent outline-none text-sm"
                        value={passengerInfo.phone}
                        onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Номер паспорта</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      <CreditCard size={14} className="text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Номер паспорта"
                        className="flex-1 bg-transparent outline-none text-sm"
                        value={passengerInfo.passportNumber}
                        onChange={(e) => setPassengerInfo({...passengerInfo, passportNumber: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Дата рождения</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      <MapPin size={14} className="text-gray-400" />
                      <input 
                        type="date" 
                        className="flex-1 bg-transparent outline-none text-sm"
                        value={passengerInfo.dateOfBirth}
                        onChange={(e) => setPassengerInfo({...passengerInfo, dateOfBirth: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-yellow-800">
                      <p className="font-medium mb-1">Важное уведомление</p>
                      <p>Убедитесь, что ваша информация полностью соответствует паспорту, иначе вы можете не попасть на рейс.</p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-200 whitespace-nowrap"
                  >
                    К оплате →
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Подтверждение оплаты</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Информация о пассажире</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Имя:</span>
                        <span className="font-medium">{passengerInfo.firstName} {passengerInfo.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{passengerInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Телефон:</span>
                        <span className="font-medium">{passengerInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Паспорт:</span>
                        <span className="font-medium">{passengerInfo.passportNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="text-blue-600" size={18} />
                      <h3 className="text-sm font-bold text-gray-900">Оплата блокчейн</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Кошелек для оплаты:</span>
                        <span className="font-mono text-xs">{wallet?.slice(0, 10)}...{wallet?.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Сумма оплаты:</span>
                        <span className="font-bold text-blue-600">{flight.price} NTI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Комиссия Gas:</span>
                        <span className="font-medium">~0.5 NTI</span>
                      </div>
                      <div className="pt-2 border-t border-blue-200 flex justify-between">
                        <span className="font-bold text-gray-900">Итого:</span>
                        <span className="font-bold text-blue-600">{(flight.price + 0.5).toFixed(1)} NTI</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 px-3 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all font-semibold text-xs sm:text-sm shadow-sm whitespace-nowrap"
                      disabled={isProcessing}
                    >
                      ← Назад
                    </button>
                    <button 
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                      className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-200 whitespace-nowrap"
                    >
                      {isProcessing ? '⏳ Ждите...' : '✓ Оплатить'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Правая сторона: информация о рейсе - оптимизированный дизайн */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-6 sticky top-24">
              <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Plane size={18} className="text-blue-600" />
                Детали рейса
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {flight.airline.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{flight.airline}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Plane size={10} />
                      Прямой рейс
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 break-words">{flight.from.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{flight.from.split(' ')[1]}</div>
                      <div className="text-xs font-bold text-blue-600 mt-1">{formatTime(flight.departure)}</div>
                    </div>
                    
                    <div className="flex flex-col items-center px-3 flex-shrink-0">
                      <div className="relative">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 rotate-90" size={14} />
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full whitespace-nowrap">
                        <Clock size={10} />
                        <span className="font-medium">{formatDuration(flight.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="text-right flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 break-words">{flight.to.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{flight.to.split(' ')[1]}</div>
                      <div className="text-xs font-bold text-purple-600 mt-1">{formatTime(flight.arrival)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-white rounded-lg p-3 border border-gray-200">
                    <Calendar size={14} className="text-blue-600" />
                    <span className="font-medium">{formatRussianDateShort(flight.departure)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span className="font-medium">Заблокированная цена в блокчейне</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{flight.price}</span>
                    <span className="text-sm font-bold text-gray-600">NTI</span>
                  </div>
                  {flight.originalPrice && flight.originalPrice > flight.price && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">{flight.originalPrice} NTI</span>
                      <span className="text-xs font-bold text-green-600">Экономия {flight.originalPrice - flight.price} NTI</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {flight.hasBaggage && (
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200">
                      🧳 С багажом
                    </span>
                  )}
                  {flight.refundable && (
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-200">
                      ✓ Возврат
                    </span>
                  )}
                  <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold border border-purple-200">
                    {flight.cabinClass === 'economy' ? '💺 Эконом' : flight.cabinClass === 'business' ? '🛋️ Бизнес' : '👑 Первый класс'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
