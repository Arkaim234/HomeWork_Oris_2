/**
 * src/data/hotels.js
 *
 * Статические данные отелей — сгенерированы из базы данных onetouche_backup.
 */

import swandorMain   from '../assets/images/hotels/swandor-topkapi/1200-0__use_origin_data_67987c684eec4f928fbdae9008b38801.jpg';
import swandorMain2  from '../assets/images/hotels/swandor-topkapi/1200-0_bgblur_17746b055fe64928b5689b4198ebb8af.jpg';
import swandorThumb  from '../assets/images/hotels/swandor-topkapi/280-200_bcc71b13670c479fbbd94f7be049f940.jpg';

import delphinMain   from '../assets/images/hotels/delphin-be-grand/1200-0_bgblur_bbb526fba3df45938fa6e54242376088.jpg';
import delphinMain2  from '../assets/images/hotels/delphin-be-grand/1200-0_bgblur_e378337d083f4fb5a538c735f44014bb.jpg';

import otiumMain     from '../assets/images/hotels/otium-stone-palace/1200-0_bgblur_b5ea43084b7d403ead9af016cb4944e7.jpg';
import otiumThumb1   from '../assets/images/hotels/otium-stone-palace/280-200_4e61ef734e7c4841bb0b0f8827f3f517.jpg';
import otiumThumb2   from '../assets/images/hotels/otium-stone-palace/280-200_a9edc123fe6c46cd86ed96fa1aead348.jpg';

import labrandaMain   from '../assets/images/hotels/labranda-tmt-bodrum/1200-0_bgblur_490168ca72564e83994bf48882e95b115c3df3.jpg';
import labrandaThumb1 from '../assets/images/hotels/labranda-tmt-bodrum/220-140_490168072ea88f21ea45c6988aedb26f6e553d.jpg';
import labrandaThumb2 from '../assets/images/hotels/labranda-tmt-bodrum/220-140_49016831234638c51644f596f56451adaf2281.jpg';
import labrandaThumb3 from '../assets/images/hotels/labranda-tmt-bodrum/220-140_490168920db31c2b71483aa757ff0c617bd786.jpg';

export const STATIC_HOTELS = [
  {
    id: 3,
    name: 'Swandor Topkapi Palace',
    slug: 'swandor-topkapi-palace',
    hotelType: 'HV-1',
    description: '<p>Концептуальный отель в стиле дворца Топкапы, ориентирован на семейный отдых и активную анимацию.</p>',
    coverPhoto: swandorMain,
    photos: [swandorMain, swandorMain2, swandorThumb],
    mealPlanCode: 'UAI',
    price: 61300,
    contacts: [],
    country: 'Турция',
    city: 'Анталья',
    address: 'Kundu Mah. Tesisler Cad.',
    distanceToAirport: 'около 20 км до аэропорта Анталья',
    distanceToCenter: 'около 20 км до центра',
    distanceToBeach: 'первая береговая линия, песчано-галечный пляж',
    yearOpened: 1999,
    yearRenovated: 2018,
    totalArea: 40000,
    buildingInfo: '<p>Отель выполнен в стилистике дворца Топкапы, несколько корпусов, большая территория и аквапарк.</p>',
    roomTypes: [
      { id: 21, name: 'Standard Room', view: 'сад/бассейн', bedConfiguration: '1 двуспальная или 2 односпальные кровати', maxOccupancy: 3, areaSquareMeters: 24 },
      { id: 22, name: 'Family Duplex', view: 'сад', bedConfiguration: '1 двуспальная + 2 односпальные кровати (мезонин)', maxOccupancy: 4, areaSquareMeters: 35 },
    ],
    inRoomServices:    ['кондиционер', 'телевизор', 'мини-бар', 'чайный набор', 'сейф'],
    childServices:     ['мини-клуб', 'детский бассейн', 'игровая площадка'],
    onSiteServices:    ['главный ресторан', 'рестораны a-la carte', 'несколько баров', 'магазины', 'собственный амфитеатр'],
    freeEntertainment: ['аквапарк', 'вечерние шоу', 'пляжный волейбол', 'теннисные корты'],
    paidEntertainment: ['фитнес-центр', 'водные виды спорта'],
    beachInfo: ['первая береговая линия', 'песчано-галечный пляж', 'лежаки/зонты бесплатно'],
    mealPlans: [
      { code: 'UAI', description: 'Ultra All Inclusive — круглосуточные бары, импортные напитки, поздний ужин.' },
      { code: 'AI',  description: 'All Inclusive — завтрак, обед, ужин, закуски, местный алкоголь.' },
    ],
  },
  {
    id: 2,
    name: 'Delphin BE Grand Resort',
    slug: 'delphin-be-grand-resort',
    hotelType: 'Boutique',
    description: '<p>Большой семейный отель на первой береговой линии с развитой инфраструктурой и анимацией.</p>',
    coverPhoto: delphinMain,
    photos: [delphinMain, delphinMain2],
    mealPlanCode: 'AI',
    price: 58500,
    contacts: [],
    country: 'Турция',
    city: 'Анталья',
    address: 'Kundu Mevkii, Lara',
    distanceToAirport: 'около 15 км до аэропорта Анталья',
    distanceToCenter: 'примерно 17 км до центра Антальи',
    distanceToBeach: 'первая береговая линия, собственный песчано-галечный пляж',
    yearOpened: 2002,
    yearRenovated: 2016,
    totalArea: 50000,
    buildingInfo: '<p>Большой комплекс из нескольких корпусов и вилл, множество бассейнов и собственный аквапарк.</p>',
    roomTypes: [
      { id: 16, name: 'Standard Room Land View', view: 'вид на сушу', bedConfiguration: '1 двуспальная или 2 односпальные кровати', maxOccupancy: 3, areaSquareMeters: 30 },
    ],
    inRoomServices:    ['кондиционер', 'телевизор', 'мини-бар', 'сейф', 'чайный набор', 'санузел с душем/ванной'],
    childServices:     ['мини-клуб', 'детская анимация', 'детские горки', 'детский буфет'],
    onSiteServices:    ['основной ресторан', 'рестораны a-la carte', 'несколько баров', 'конференц-зал', 'прачечная (платно)'],
    freeEntertainment: ['аквапарк', 'анимация', 'теннисные корты'],
    paidEntertainment: ['фитнес-центр', 'водные виды спорта'],
    beachInfo: ['первая береговая линия', 'песчано-галечный пляж', 'лежаки и зонты — бесплатно', 'пирс'],
    mealPlans: [
      { code: 'AI', description: 'All Inclusive — завтрак, обед, ужин, закуски, местный алкоголь.' },
    ],
  },
  {
    id: 5,
    name: 'Otium Family Stone Palace',
    slug: 'otium-family-stone-palace',
    hotelType: 'Семейный',
    description: '<p>Семейный отель с большой зелёной территорией, бассейнами и развитой инфраструктурой для детей.</p>',
    coverPhoto: otiumMain,
    photos: [otiumMain, otiumThumb1, otiumThumb2],
    mealPlanCode: 'AI',
    price: 52700,
    contacts: [],
    country: 'Турция',
    city: 'Сиде',
    address: 'Colakli Mevkii',
    distanceToAirport: 'около 55 км до аэропорта Анталья',
    distanceToCenter: 'примерно 12 км до центра Сиде',
    distanceToBeach: 'собственный песчаный пляж, в 450 м от отеля',
    yearOpened: 2000,
    yearRenovated: 2015,
    totalArea: 35000,
    buildingInfo: '<p>Комплекс из нескольких корпусов в окружении зелени, плавные дорожки и множество зон отдыха.</p>',
    roomTypes: [
      { id: 12, name: 'Standard Room', view: 'сад/бассейн', bedConfiguration: '1 двуспальная или 2 односпальные кровати', maxOccupancy: 3, areaSquareMeters: 24 },
      { id: 13, name: 'Family Room',   view: 'сад', bedConfiguration: '1 двуспальная + 2 односпальные кровати', maxOccupancy: 4, areaSquareMeters: 32 },
      { id: 14, name: 'Large Room',    view: 'сад', bedConfiguration: '1 двуспальная + диван-кровать', maxOccupancy: 4, areaSquareMeters: 28 },
    ],
    inRoomServices:    ['телевизор', 'сейф', 'мини-бар', 'чайный набор'],
    childServices:     ['мини-клуб', 'детская площадка', 'мини-диско'],
    onSiteServices:    ['главный ресторан', 'рестораны a-la carte', 'бары на территории', 'магазины'],
    freeEntertainment: ['анимация', 'аквапарк', 'теннисные корты', 'фитнес зал'],
    paidEntertainment: ['водные виды спорта'],
    beachInfo: ['собственный песчаный пляж', 'трансфер до пляжа'],
    mealPlans: [
      { code: 'AI', description: 'All Inclusive — завтрак, обед, ужин, закуски, местный алкоголь.' },
    ],
  },
  {
    id: 4,
    name: 'Labranda TMT Bodrum Resort',
    slug: 'labranda-tmt-bodrum-resort',
    hotelType: 'HV-2',
    description: '<p>Популярный клубный отель на берегу Эгейского моря, недалеко от центра Бодрума.</p>',
    coverPhoto: labrandaMain,
    photos: [labrandaMain, labrandaThumb1, labrandaThumb2, labrandaThumb3],
    mealPlanCode: 'AI',
    price: 49800,
    contacts: [],
    country: 'Турция',
    city: 'Бодрум',
    address: 'Kumbahce Mah. Ataturk Cad. No:180',
    distanceToAirport: 'около 35 км до аэропорта Бодрум',
    distanceToCenter: 'примерно 1,5 км до центра Бодрума',
    distanceToBeach: 'собственная пляжная платформа и небольшая песчано-галечная полоса',
    yearOpened: 2004,
    yearRenovated: 2017,
    totalArea: 30000,
    buildingInfo: '<p>Каскадная застройка на склоне, корпуса и бунгало, террасы с видом на Эгейское море.</p>',
    roomTypes: [
      { id:  9, name: 'Standard Garden View', view: 'сад', bedConfiguration: '1 двуспальная или 2 односпальные кровати', maxOccupancy: 3, areaSquareMeters: 22 },
      { id: 10, name: 'Standard Sea View',    view: 'море', bedConfiguration: '1 двуспальная кровать', maxOccupancy: 3, areaSquareMeters: 24 },
      { id: 11, name: 'Family Room',          view: 'частичный вид на море', bedConfiguration: '1 двуспальная + 2 односпальные кровати', maxOccupancy: 4, areaSquareMeters: 30 },
    ],
    inRoomServices:    ['телевизор', 'чайный набор', 'мини-бар'],
    childServices:     ['детский бассейн', 'мини-клуб', 'анимация для детей'],
    onSiteServices:    ['главный ресторан', 'бар у бассейна', 'собственная пирс-платформа'],
    freeEntertainment: ['дневная и вечерняя анимация', 'пляжный волейбол', 'фитнес зал'],
    paidEntertainment: ['водные виды спорта'],
    beachInfo: ['пляжная платформа', 'песчано-галечный вход'],
    mealPlans: [
      { code: 'AI', description: 'All Inclusive — завтрак, обед, ужин, закуски, местный алкоголь.' },
    ],
  },
];

export function getHotelBySlug(slug) {
  return STATIC_HOTELS.find(h => h.slug === slug);
}