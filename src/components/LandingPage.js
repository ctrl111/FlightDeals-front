'use client';

import { Wallet, Plane, Lock, ShieldCheck, Zap, TrendingUp, Users, Award } from 'lucide-react';

export default function LandingPage({ onConnect }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Hero */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12 lg:py-0 bg-gray-50">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Web3 система продажи билетов
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Децентрализованные путешествия <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Прозрачные цены, безопасность
              </span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              FlightDeals использует технологию блокчейн для решения проблем овербукинга и непрозрачности цен на авиабилеты.
              Подключите свой криптокошелёк — регистрация не требуется. Начните безопасное путешествие прямо сейчас.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={onConnect}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-xl text-lg font-medium"
              >
                <Wallet size={20} />
                Подключить кошелёк
              </button>
              <p className="text-sm text-gray-400 text-center sm:text-left pl-1">
                Поддержка MetaMask, WalletConnect и других популярных кошельков
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Анонимность и безопасность</h3>
                  <p className="text-sm text-gray-500">Адрес кошелька — ваш уникальный ID, пароль не требуется</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Смарт-контракты</h3>
                  <p className="text-sm text-gray-500">Данные билетов хранятся в блокчейне и не могут быть изменены</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Мгновенные транзакции</h3>
                  <p className="text-sm text-gray-500">Оплата криптовалютой, подтверждение за секунды</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Прозрачное ценообразование</h3>
                  <p className="text-sm text-gray-500">Фиксированные цены без скрытых комиссий</p>
                </div>
              </div>
            </div>

            {/* Статистические данные */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Users size={14} />
                    Активных пользователей
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Plane size={14} />
                    Авиакомпаний-партнеров
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <Award size={14} />
                    Удовлетворенность
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-96 h-96">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl text-white shadow-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-white/60 text-sm">FROM</div>
                      <div className="text-3xl font-bold">SVO</div>
                    </div>
                    <Plane className="mt-2 rotate-90 opacity-80" />
                    <div className="text-right">
                      <div className="text-white/60 text-sm">TO</div>
                      <div className="text-3xl font-bold">LED</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-white/20 rounded-full w-full"></div>
                    <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                    <div className="h-16 bg-white rounded-xl mt-6 flex items-center justify-center">
                       <span className="text-gray-900 font-mono font-bold tracking-widest">FLIGHT DEALS</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
