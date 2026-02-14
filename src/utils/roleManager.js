/**
 * Инструмент управления ролями
 * Используется для запроса и управления ролями пользователей
 */

// Константы ролей
export const ROLES = {
  USER: 'user',
  AIRLINE: 'airline',
  ADMIN: 'admin'
};

// Имитация базы данных ролей (в продакшене должно получаться из бэкенда или смарт-контракта)
const ROLE_DATABASE = {
  // Адрес администратора (развертыватель контракта)
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb': ROLES.ADMIN,
  
  // Адреса авиакомпаний (зарегистрированные авиакомпании)
  '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed': ROLES.AIRLINE,
  '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359': ROLES.AIRLINE,
  
  // Остальные адреса по умолчанию - обычные пользователи
};

/**
 * Получить роль пользователя по адресу кошелька
 * @param {string} address - Адрес кошелька
 * @returns {Promise<string>} Роль ('user' | 'airline' | 'admin')
 */
export async function getUserRole(address) {
  if (!address) return ROLES.USER;
  
  // Нормализация адреса (в нижний регистр)
  const normalizedAddress = address.toLowerCase();
  
  // Вариант 1: Запрос из локальной базы данных (демо-режим)
  const role = ROLE_DATABASE[normalizedAddress];
  if (role) return role;
  
  // Вариант 2: Запрос из бэкенд API (продакшен)
  // try {
  //   const response = await fetch(`/api/users/${address}/role`);
  //   const data = await response.json();
  //   return data.role || ROLES.USER;
  // } catch (error) {
  //   console.error('Failed to fetch role:', error);
  //   return ROLES.USER;
  // }
  
  // Вариант 3: Запрос из смарт-контракта (Web3)
  // try {
  //   const contract = new ethers.Contract(
  //     ROLE_CONTRACT_ADDRESS,
  //     ROLE_ABI,
  //     provider
  //   );
  //   const roleId = await contract.getRole(address);
  //   return roleId === 1 ? ROLES.AIRLINE : roleId === 2 ? ROLES.ADMIN : ROLES.USER;
  // } catch (error) {
  //   console.error('Failed to fetch role from contract:', error);
  //   return ROLES.USER;
  // }
  
  // По умолчанию возвращаем обычного пользователя
  return ROLES.USER;
}

/**
 * Проверить, имеет ли пользователь определенную роль
 * @param {string} userRole - Текущая роль пользователя
 * @param {string} requiredRole - Требуемая роль
 * @returns {boolean}
 */
export function hasRole(userRole, requiredRole) {
  return userRole === requiredRole;
}

/**
 * Проверить, может ли пользователь получить доступ к странице
 * @param {string} userRole - Роль пользователя
 * @param {string} page - Название страницы
 * @returns {boolean}
 */
export function canAccessPage(userRole, page) {
  const permissions = {
    marketplace: [ROLES.USER, ROLES.AIRLINE, ROLES.ADMIN],
    profile: [ROLES.USER, ROLES.AIRLINE, ROLES.ADMIN],
    dashboard: [ROLES.AIRLINE, ROLES.ADMIN],
    admin: [ROLES.ADMIN]
  };
  
  return permissions[page]?.includes(userRole) || false;
}

/**
 * Получить отображаемое имя роли
 * @param {string} role - Код роли
 * @returns {string} Отображаемое имя
 */
export function getRoleDisplayName(role) {
  const names = {
    [ROLES.USER]: 'Пользователь',
    [ROLES.AIRLINE]: 'Авиакомпания',
    [ROLES.ADMIN]: 'Администратор'
  };
  return names[role] || 'Неизвестная роль';
}

/**
 * Зарегистрировать новую авиакомпанию (только администратор может вызвать)
 * @param {string} adminAddress - Адрес администратора
 * @param {string} airlineAddress - Адрес авиакомпании
 * @returns {Promise<boolean>}
 */
export async function registerAirline(adminAddress, airlineAddress) {
  // Проверка прав администратора
  const adminRole = await getUserRole(adminAddress);
  if (adminRole !== ROLES.ADMIN) {
    throw new Error('Только администратор может регистрировать авиакомпании');
  }
  
  // Продакшен: вызов смарт-контракта или бэкенд API
  // const contract = new ethers.Contract(...);
  // await contract.registerAirline(airlineAddress);
  
  // Демо-режим: обновление локальной базы данных
  ROLE_DATABASE[airlineAddress.toLowerCase()] = ROLES.AIRLINE;
  
  return true;
}

/**
 * Заявка на регистрацию авиакомпании
 * @param {string} address - Адрес заявителя
 * @param {object} applicationData - Данные заявки
 * @returns {Promise<string>} ID заявки
 */
export async function applyForAirlineRole(address, applicationData) {
  // Продакшен: отправка на бэкенд
  // const response = await fetch('/api/airline/apply', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ address, ...applicationData })
  // });
  // return response.json();
  
  // Демо-режим
  console.log('Заявка авиакомпании отправлена:', { address, ...applicationData });
  return 'APP-' + Date.now();
}

/**
 * Проверить подпись кошелька
 * @param {string} address - Адрес кошелька
 * @param {string} message - Сообщение для подписи
 * @returns {Promise<string>} Подпись
 */
export async function signMessage(address, message) {
  if (!window.ethereum) {
    throw new Error('Кошелек не найден');
  }
  
  try {
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address]
    });
    return signature;
  } catch (error) {
    console.error('Ошибка подписи:', error);
    throw error;
  }
}

/**
 * Генерировать случайный nonce для проверки подписи
 * @returns {string}
 */
export function generateNonce() {
  return `FlightDeals Вход: ${Date.now()}-${Math.random().toString(36).substring(7)}`;
}
