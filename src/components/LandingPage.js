'use client';

import { useState, useEffect } from 'react';
import { Wallet, Plane, Lock, ShieldCheck, Zap, Globe, Users, Award, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function LandingPage({ onConnect }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded-full w-64 mx-auto mb-8 animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-full max-w-3xl mx-auto mb-12 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 px-4 py-2 rounded-full mb-8 shadow-lg hover:shadow-xl transition-all">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Блокчейн-платформа нового поколения</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Путешествуйте с
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                FlightDeals
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Первая децентрализованная платформа для покупки авиабилетов.
              <br />
              Прозрачность, безопасность и честные цены на блокчейне.
            </p>

            {/* CTA Button */}
            <button
              onClick={onConnect}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Wallet size={24} />
              <span>Подключить кошелёк</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Поддержка MetaMask, WalletConnect и других Web3 кошельков
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают FlightDeals?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Революционная технология блокчейн решает главные проблемы авиаиндустрии
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Lock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Полная безопасность</h3>
              <p className="text-gray-600 leading-relaxed">
                Ваш адрес кошелька — это ваш уникальный ID. Никаких паролей, никаких утечек данных. Полная анонимность и защита.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Смарт-контракты</h3>
              <p className="text-gray-600 leading-relaxed">
                Все билеты защищены смарт-контрактами. Данные хранятся в блокчейне и не могут быть изменены или удалены.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Мгновенные сделки</h3>
              <p className="text-gray-600 leading-relaxed">
                Оплата криптовалютой и подтверждение за секунды. Никаких задержек, никаких посредников.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Прозрачные цены</h3>
              <p className="text-gray-600 leading-relaxed">
                Фиксированные цены без скрытых комиссий. Вы видите реальную стоимость билета, записанную в блокчейне.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Plane className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Без овербукинга</h3>
              <p className="text-gray-600 leading-relaxed">
                Блокчейн гарантирует, что каждый билет уникален. Невозможно продать больше билетов, чем мест в самолёте.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Для всех участников</h3>
              <p className="text-gray-600 leading-relaxed">
                Платформа для пассажиров, авиакомпаний и администраторов. Каждый получает удобные инструменты.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Как это работает?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Три простых шага до вашего билета
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-6xl font-bold text-blue-400 mb-4">01</div>
                <h3 className="text-2xl font-bold mb-3">Подключите кошелёк</h3>
                <p className="text-gray-300 leading-relaxed">
                  Используйте MetaMask или любой другой Web3 кошелёк. Регистрация не требуется.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="text-blue-400" size={32} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-6xl font-bold text-purple-400 mb-4">02</div>
                <h3 className="text-2xl font-bold mb-3">Выберите рейс</h3>
                <p className="text-gray-300 leading-relaxed">
                  Просмотрите доступные рейсы с прозрачными ценами и выберите подходящий.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="text-purple-400" size={32} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-6xl font-bold text-pink-400 mb-4">03</div>
                <h3 className="text-2xl font-bold mb-3">Оплатите и летите</h3>
                <p className="text-gray-300 leading-relaxed">
                  Подтвердите транзакцию в кошельке. Билет мгновенно записывается в блокчейн.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">FlightDeals</span>
            </div>
            <div className="text-gray-600 text-center md:text-left">
              <p>© 2026 FlightDeals. Построено на блокчейне.</p>
              <p className="text-sm mt-1">Децентрализованная платформа для покупки авиабилетов</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
