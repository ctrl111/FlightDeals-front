'use client';

import { Plane, User, LogOut } from 'lucide-react';

export default function Navbar({ wallet, onDisconnect, role, setRole, setView, currentView, onConnect, isConnecting }) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center gap-6">
            <div 
              className="flex-shrink-0 flex items-center gap-1.5 cursor-pointer"
              onClick={() => setView('marketplace')}
            >
              <div className="bg-blue-600 p-1 rounded-lg">
                <Plane className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">FlightDeals</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              <button 
                onClick={() => setView('marketplace')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${currentView === 'marketplace' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Билеты
              </button>
              {wallet && role === 'user' && (
                <button 
                  onClick={() => setView('profile')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${currentView === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  Мой кабинет
                </button>
              )}
              {wallet && role === 'airline' && (
                <button 
                  onClick={() => setView('dashboard')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${currentView === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  Управление
                </button>
              )}
              {wallet && role === 'admin' && (
                <button 
                  onClick={() => setView('admin')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${currentView === 'admin' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  Администрирование
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {wallet ? (
              <>
                <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-1 border border-gray-100">
                  <span className="whitespace-nowrap">Роль:</span>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-transparent border-none outline-none font-semibold text-gray-600 cursor-pointer text-xs"
                  >
                    <option value="user">Пользователь</option>
                    <option value="airline">Авиакомпания</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-gray-900 text-white pl-1 pr-2.5 py-1 rounded-full border border-gray-800 shadow-sm">
                  <div className="w-7 h-7 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <div className="flex flex-col items-start mr-1.5">
                    <span className="font-mono text-xs font-medium leading-none mb-0.5">
                      {wallet.slice(0, 6)}...{wallet.slice(-4)}
                    </span>
                    <span className="text-[9px] text-gray-400 leading-none">Подключено</span>
                  </div>
                  <div className="h-3.5 w-px bg-gray-700 mx-0.5"></div>
                  <LogOut 
                    size={12} 
                    className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors" 
                    onClick={onDisconnect}
                  />
                </div>
              </>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition-all text-xs font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></div>
                    Ждите...
                  </>
                ) : (
                  <>
                    <User size={14} />
                    Войти
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
