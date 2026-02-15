// Русская локализация для дат

export const RUSSIAN_MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const RUSSIAN_MONTHS_SHORT = [
  'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
  'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
];

export const RUSSIAN_DAYS = [
  'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
  'Четверг', 'Пятница', 'Суббота'
];

export const RUSSIAN_DAYS_SHORT = [
  'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
];

// Форматирование даты на русском языке
export const formatRussianDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = RUSSIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = RUSSIAN_DAYS[date.getDay()];
  
  return `${dayOfWeek}, ${day} ${month} ${year}`;
};

// Короткий формат даты
export const formatRussianDateShort = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
};

// Получить текущую дату в формате YYYY-MM-DD для input[type="date"]
export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Получить минимальную дату (сегодня)
export const getMinDate = () => getTodayString();

// Получить максимальную дату (через год)
export const getMaxDate = () => {
  const today = new Date();
  const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
  const year = nextYear.getFullYear();
  const month = (nextYear.getMonth() + 1).toString().padStart(2, '0');
  const day = nextYear.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Форматирование времени (HH:MM)
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Форматирование длительности полета
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours}ч ${mins}м`;
  } else if (hours > 0) {
    return `${hours}ч`;
  } else {
    return `${mins}м`;
  }
};
