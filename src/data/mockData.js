export const INITIAL_FLIGHTS = [
  {
    id: 1,
    from: 'Москва (SVO)',
    to: 'Санкт-Петербург (LED)',
    price: 450,
    originalPrice: 550, // Исходная цена
    discount: 18, // Процент скидки
    airline: 'SkyWings Airlines',
    departure: '2023-11-15T10:00:00',
    deadline: new Date(Date.now() + 3600000 * 2).toISOString(),
    status: 'active',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    soldCount: 15, // Количество продаж - для определения популярности
    cabinClass: 'economy',
    hasBaggage: true,
    refundable: false
  },
  {
    id: 2,
    from: 'Москва (DME)',
    to: 'Сочи (AER)',
    price: 820,
    originalPrice: 950,
    discount: 14,
    airline: 'NorthStar Aviation',
    departure: '2023-11-20T14:30:00',
    deadline: new Date(Date.now() + 3600000 * 5).toISOString(),
    status: 'active',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    soldCount: 3,
    cabinClass: 'business',
    hasBaggage: true,
    refundable: true
  },
  {
    id: 3,
    from: 'Санкт-Петербург (LED)',
    to: 'Казань (KZN)',
    price: 1200,
    originalPrice: 1400,
    discount: 14,
    airline: 'EagleJet Airways',
    departure: '2023-12-01T08:00:00',
    deadline: new Date(Date.now() + 1800000).toISOString(),
    status: 'active',
    walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
    soldCount: 22, // Высокие продажи
    cabinClass: 'economy',
    hasBaggage: true,
    refundable: false
  }
];
