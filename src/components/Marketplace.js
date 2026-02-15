'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plane, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Calendar,
  MapPin,
  ArrowLeftRight,
  TrendingDown,
  Zap,
  Users,
  Star,
  Sparkles
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { getMinDate, getMaxDate, formatRussianDateShort } from '@/utils/dateLocale';

export default function Marketplace({ flights, onBuy, wallet }) {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const itemsPerPage = 9; // Показывать 9 на странице (3 столбца x 3 строки)

  // 移除热门推荐功能

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    console.log('Поиск:', { searchFrom, searchTo, searchDate });
  };

  const swapLocations = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  // Расчет пагинации
  const totalPages = Math.ceil(flights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlights = flights.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Предотвращение ошибки гидратации: не рендерить анимацию до монтирования на клиенте
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Рынок билетов</h1>
            <p className="text-sm text-gray-600">Прозрачное ценообразование на блокчейне · Без скрытых комиссий</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Динамическое фоновое оформление */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Область заголовка - более живая */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
              <Sparkles size={14} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Гарантия цены в реальном времени на блокчейне
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">{flights.length} рейсов онлайн</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Найдите своё следующее путешествие
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Прозрачная система ценообразования на основе блокчейна, без скрытых комиссий, безопасность транзакций гарантирована смарт-контрактами
          </p>
        </div>

        {/* Карточка поиска - более изысканный дизайн */}
        <div className="max-w-4xl mx-auto mb-8 animate-slide-up">
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            {/* Основная строка поиска */}
            <div className="flex items-center gap-3 mb-3">
              {/* Город отправления */}
              <div className="flex-1 relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
                  <div className="w-3 h-3 rounded-full border-2 border-current"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Город отправления" 
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm hover:bg-white hover:shadow-sm"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                />
              </div>

              {/* Кнопка обмена */}
              <button 
                onClick={swapLocations}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all flex-shrink-0 hover:rotate-180 duration-300 shadow-md hover:shadow-lg"
              >
                <ArrowLeftRight className="text-white" size={16} />
              </button>

              {/* Город назначения */}
              <div className="flex-1 relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600" size={16} />
                <input 
                  type="text" 
                  placeholder="Город назначения" 
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm hover:bg-white hover:shadow-sm"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                />
              </div>

              {/* Выбор даты */}
              <div className="w-52 relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600" size={16} />
                <input 
                  type="date" 
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm hover:bg-white hover:shadow-sm"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  placeholder="Выберите дату"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center gap-2 shadow-lg text-sm hover:shadow-xl hover:scale-105 active:scale-95 duration-200"
              >
                <Search size={16} />
                Найти рейсы
              </button>
            </div>
            
            {/* Подсказка быстрого поиска */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Zap size={12} className="text-yellow-500" />
              <span>Популярные маршруты:</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Москва → Санкт-Петербург</button>
              <span className="text-gray-300">|</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Москва → Сочи</button>
            </div>
          </div>
        </div>

        {/* Быстрая фильтрация - более современный дизайн */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              Быстрый фильтр:
            </span>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg text-xs font-semibold text-blue-700 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md">
              ✈️ Прямые рейсы
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg text-xs font-semibold text-green-700 hover:from-green-100 hover:to-green-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md">
              💰 Низкая цена
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg text-xs font-semibold text-orange-700 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md">
              ⏰ Скоро закончится
            </button>
          </div>
          <select 
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:bg-gray-100 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">💵 Сортировка по цене</option>
            <option value="time">⏱️ Сортировка по времени</option>
            <option value="airline">🏢 Сортировка по авиакомпании</option>
          </select>
        </div>

        {/* Список рейсов - оптимизированный дизайн карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentFlights.map((flight, index) => {
            return (
              <div 
                key={flight.id} 
                className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2 animate-fade-in-up overflow-hidden relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* 角标标签 */}
                {flight.discount && flight.discount > 0 && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
                      -{flight.discount}%
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col h-full">
                  {/* Верх: информация об авиакомпании */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0">
                        {flight.airline.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-gray-900 truncate">{flight.airline}</div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <Plane size={8} />
                          Прямой
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Обратный отсчет */}
                  <div className="mb-3">
                    <CountdownTimer targetDate={flight.deadline} />
                  </div>

                  {/* Середина: информация о маршруте - больше и четче */}
                  <div className="mb-4 flex-grow">
                    <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2.5">
                      <div className="flex-1 min-w-0 text-center">
                        <div className="text-sm font-bold text-gray-900 px-1 break-words">{flight.from.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{flight.from.split(' ')[1]}</div>
                      </div>
                      
                      <div className="flex flex-col items-center px-2 flex-shrink-0">
                        <div className="relative">
                          <div className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 rotate-90 group-hover:translate-x-1 transition-transform duration-500" size={12} />
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          <Clock size={8} />
                          <span className="font-medium">8ч</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 text-center">
                        <div className="text-sm font-bold text-gray-900 px-1 break-words">{flight.to.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{flight.to.split(' ')[1]}</div>
                      </div>
                    </div>
                    
                    <div className="text-[10px] text-gray-600 text-center mb-2.5 flex items-center justify-center gap-1">
                      <Calendar size={10} className="text-blue-600" />
                      <span className="font-medium">{formatRussianDateShort(flight.departure)}</span>
                    </div>
                    
                    {/* Метки */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {flight.hasBaggage && (
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-semibold hover:bg-blue-100 transition-colors duration-200 border border-blue-200 whitespace-nowrap">
                          🧳
                        </span>
                      )}
                      {flight.refundable && (
                        <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-semibold hover:bg-green-100 transition-colors duration-200 border border-green-200 whitespace-nowrap">
                          ✓
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px] font-semibold hover:bg-purple-100 transition-colors duration-200 border border-purple-200 whitespace-nowrap">
                        {flight.cabinClass === 'economy' ? '💺' : flight.cabinClass === 'business' ? '🛋️' : '👑'}
                      </span>
                    </div>
                  </div>

                  {/* Низ: цена и кнопка покупки */}
                  <div className="pt-3 border-t-2 border-gray-100">
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-0.5">
                          <ShieldCheck size={10} className="text-green-600 flex-shrink-0" />
                          <span className="font-medium truncate">Блокчейн</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                            {flight.price}
                          </span>
                          <span className="text-xs font-bold text-gray-600">NTI</span>
                        </div>
                        {flight.originalPrice && flight.originalPrice > flight.price && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {flight.originalPrice}
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => onBuy(flight)}
                        className="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-bold flex items-center gap-1 text-xs hover:scale-105 active:scale-95 hover:shadow-lg shadow-md whitespace-nowrap flex-shrink-0"
                      >
                        Купить
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Навигация по страницам - более изысканный дизайн */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-5 animate-fade-in" style={{animationDelay: '0.5s'}}>
            {/* Информация о страницах */}
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              Показано <span className="font-bold text-blue-600">{startIndex + 1}-{Math.min(endIndex, flights.length)}</span> / всего <span className="font-bold text-gray-900">{flights.length}</span> рейсов
            </div>
            
            {/* Кнопки пагинации */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md"
              >
                ← Назад
              </button>
              
              <div className="flex items-center gap-2">
                {/* Умное отображение номеров страниц */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-110'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:shadow-md'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="text-gray-400 px-1 font-bold">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md"
              >
                Вперед →
              </button>
            </div>
          </div>
        )}

        {/* Загрузить еще */}
        {flights.length > 0 && false && (
          <div className="text-center mt-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm hover:shadow-md hover:scale-105 active:scale-95">
              Загрузить больше рейсов
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
