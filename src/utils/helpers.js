/**
 * Вспомогательные функции
 */

/**
 * Получить отображаемое имя роли
 */
export function getRoleDisplayName(role) {
  const names = {
    user: 'Пользователь',
    airline: 'Авиакомпания',
    admin: 'Администратор'
  };
  return names[role] || 'Неизвестная роль';
}

/**
 * Форматировать адрес кошелька
 */
export function formatAddress(address, startLength = 6, endLength = 4) {
  if (!address) return '';
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Форматировать дату
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Форматировать время
 */
export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Конвертировать NTI в RUB
 */
export function ntiToRub(nti, rate = 0.85) {
  return (nti * rate).toFixed(2);
}
