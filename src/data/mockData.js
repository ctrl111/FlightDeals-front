export const INITIAL_FLIGHTS = [
  {
    id: 1,
    from: 'Москва (SVO)',
    to: 'Санкт-Петербург (LED)',
    price: 450,
    originalPrice: 550,
    discount: 18,
    airline: 'SkyWings Airlines',
    departure: '2025-12-15T10:00:00',
    arrival: '2025-12-15T11:30:00',
    duration: 90, // минуты
    deadline: new Date(Date.now() + 3600000 * 2).toISOString(),
    status: 'active',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    soldCount: 15,
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
    departure: '2025-12-20T14:30:00',
    arrival: '2025-12-20T16:45:00',
    duration: 135, // минуты
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
    departure: '2025-12-25T08:00:00',
    arrival: '2025-12-25T10:30:00',
    duration: 150, // минуты
    deadline: new Date(Date.now() + 1800000).toISOString(),
    status: 'active',
    walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
    soldCount: 22,
    cabinClass: 'economy',
    hasBaggage: true,
    refundable: false
  }
];
