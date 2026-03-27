using MiniHttpServer.Model;

namespace OneToche.API.data
{
    public static class DataSeed
    {
        public static List<Country> Countries => new()
        {
            new Country { Id = 1, Name = "Россия" },
            new Country { Id = 2, Name = "Турция" }
        };

        public static List<City> Cities => new()
        {
            new City { Id = 1, Name = "Волгоград", CountryId = 1 },
            new City { Id = 2, Name = "Грозный", CountryId = 1 },
            new City { Id = 3, Name = "Екатеринбург", CountryId = 1 },
            new City { Id = 4, Name = "Иркутск", CountryId = 1 },
            new City { Id = 5, Name = "Казань", CountryId = 1 },
            new City { Id = 6, Name = "Красноярск", CountryId = 1 },
            new City { Id = 7, Name = "Махачкала", CountryId = 1 },
            new City { Id = 8, Name = "Минеральные Воды", CountryId = 1 },
            new City { Id = 9, Name = "Москва", CountryId = 1 },
            new City { Id = 10, Name = "Новосибирск", CountryId = 1 },
            new City { Id = 11, Name = "Самара", CountryId = 1 },
            new City { Id = 12, Name = "Санкт-Петербург", CountryId = 1 },
            new City { Id = 13, Name = "Сочи", CountryId = 1 },
            new City { Id = 14, Name = "Уфа", CountryId = 1 },
            new City { Id = 15, Name = "Хабаровск", CountryId = 1 },

            new City { Id = 16, Name = "Аланья", CountryId = 2 },
            new City { Id = 17, Name = "Анкара", CountryId = 2 },
            new City { Id = 18, Name = "Анталья", CountryId = 2 },
            new City { Id = 19, Name = "Белек", CountryId = 2 },
            new City { Id = 20, Name = "Бодрум", CountryId = 2 },
            new City { Id = 21, Name = "Даламан", CountryId = 2 },
            new City { Id = 22, Name = "Дидим", CountryId = 2 },
            new City { Id = 23, Name = "Измир", CountryId = 2 },
            new City { Id = 24, Name = "Кемер", CountryId = 2 },
            new City { Id = 25, Name = "Кушадасы", CountryId = 2 },
            new City { Id = 26, Name = "Мармарис", CountryId = 2 },
            new City { Id = 27, Name = "Регион Центр", CountryId = 2 },
            new City { Id = 28, Name = "Сиде", CountryId = 2 },
            new City { Id = 29, Name = "Стамбул", CountryId = 2 },
            new City { Id = 30, Name = "Фетхие", CountryId = 2 }
        };

        public static List<HotelCategory> Categories => new()
        {
            new HotelCategory { Id = 1, Name = "2*" },
            new HotelCategory { Id = 2, Name = "3*" },
            new HotelCategory { Id = 3, Name = "4*" },
            new HotelCategory { Id = 4, Name = "5*" },
            new HotelCategory { Id = 5, Name = "Apart" },
            new HotelCategory { Id = 6, Name = "Boutique" },
            new HotelCategory { Id = 7, Name = "HV-1" },
            new HotelCategory { Id = 8, Name = "HV-2" },
            new HotelCategory { Id = 9, Name = "Special category" },
            new HotelCategory { Id = 10, Name = "Без категории" },
            new HotelCategory { Id = 11, Name = "Все" },
            new HotelCategory { Id = 12, Name = "Дополнительно" },
            new HotelCategory { Id = 13, Name = "Safe tourism" },
            new HotelCategory { Id = 14, Name = "SPA услуги" },
            new HotelCategory { Id = 15, Name = "VIP" },
            new HotelCategory { Id = 16, Name = "Аквапарк" },
            new HotelCategory { Id = 17, Name = "Гарантия лучшей цены" },
            new HotelCategory { Id = 18, Name = "Отель только для взрослых (14+)" },
            new HotelCategory { Id = 19, Name = "Отель только для взрослых (16+)" },
            new HotelCategory { Id = 20, Name = "Отель только для взрослых (18+)" },
            new HotelCategory { Id = 21, Name = "Подогреваемый бассейн" },
            new HotelCategory { Id = 22, Name = "Размещение с животными" },
            new HotelCategory { Id = 23, Name = "Рекомендуем" },
            new HotelCategory { Id = 24, Name = "Семейный" }
        };

        public static List<HotelCategoryMap> HotelCategoryMaps => new()
        {
            new HotelCategoryMap { HotelId = 2, CategoryId = 6 },   // Boutique
            new HotelCategoryMap { HotelId = 3, CategoryId = 7 },   // HV-1
            new HotelCategoryMap { HotelId = 4, CategoryId = 8 },   // HV-2
            new HotelCategoryMap { HotelId = 5, CategoryId = 24 }   // Семейный
        };

        public static List<Hotel> Hotels => new()
        {
            new Hotel
            {
                Id = 2,
                Name = "Delphin BE Grand Resort",
                Slug = "delphin-be-grand-resort",
                CityId = 18,
                HotelType = "Boutique",
                Description = "Большой семейный отель на первой береговой линии с развитой инфраструктурой и анимацией.",
                PhotoUrl = "/src/assets/images/hotels/delphin-be-grand/1200-0_bgblur_bbb526fba3df45938fa6e54242376088.jpg",
                MealPlans = new List<string> { "AI" },
                Price = 58500,
                Contacts = Array.Empty<string>()
            },
            new Hotel
            {
                Id = 3,
                Name = "Swandor Topkapi Palace",
                Slug = "swandor-topkapi-palace",
                CityId = 18,
                HotelType = "HV-1",
                Description = "Концептуальный отель в стиле дворца Топкапы, ориентирован на семейный отдых и активную анимацию.",
                PhotoUrl = "/src/assets/images/hotels/swandor-topkapi/1200-0__use_origin_data_67987c684eec4f928fbdae9008b38801.jpg",
                MealPlans = new List<string> { "UAI" },
                Price = 61300,
                Contacts = Array.Empty<string>()
            },
            new Hotel
            {
                Id = 4,
                Name = "Labranda TMT Bodrum Resort",
                Slug = "labranda-tmt-bodrum-resort",
                CityId = 20,
                HotelType = "HV-2",
                Description = "Популярный клубный отель на берегу Эгейского моря, недалеко от центра Бодрума.",
                PhotoUrl = "/src/assets/images/hotels/labranda-tmt-bodrum/1200-0_bgblur_490168ca72564e83994bf48882e95b115c3df3.jpg",
                MealPlans = new List<string> { "AI" },
                Price = 49800,
                Contacts = Array.Empty<string>()
            },
            new Hotel
            {
                Id = 5,
                Name = "Otium Family Stone Palace",
                Slug = "otium-family-stone-palace",
                CityId = 28,
                HotelType = "Семейный",
                Description = "Семейный отель с большой зелёной территорией, бассейнами и развитой инфраструктурой для детей.",
                PhotoUrl = "/src/assets/images/hotels/otium-stone-palace/1200-0_bgblur_b5ea43084b7d403ead9af016cb4944e7.jpg",
                MealPlans = new List<string> { "AI" },
                Price = 52700,
                Contacts = Array.Empty<string>()
            }
        };

        public static Dictionary<int, List<string>> HotelPhotos => new()
        {
            [2] = new List<string>
            {
                "/src/assets/images/hotels/delphin-be-grand/1200-0_bgblur_bbb526fba3df45938fa6e54242376088.jpg",
                "/src/assets/images/hotels/delphin-be-grand/1200-0_bgblur_e378337d083f4fb5a538c735f44014bb.jpg"
            },
            [3] = new List<string>
            {
                "/src/assets/images/hotels/swandor-topkapi/1200-0__use_origin_data_67987c684eec4f928fbdae9008b38801.jpg",
                "/src/assets/images/hotels/swandor-topkapi/1200-0_bgblur_17746b055fe64928b5689b4198ebb8af.jpg",
                "/src/assets/images/hotels/swandor-topkapi/280-200_bcc71b13670c479fbbd94f7be049f940.jpg"
            },
            [4] = new List<string>
            {
                "/src/assets/images/hotels/labranda-tmt-bodrum/1200-0_bgblur_490168ca72564e83994bf48882e95b115c3df3.jpg",
                "/src/assets/images/hotels/labranda-tmt-bodrum/220-140_490168072ea88f21ea45c6988aedb26f6e553d.jpg",
                "/src/assets/images/hotels/labranda-tmt-bodrum/220-140_490168920db31c2b71483aa757ff0c617bd786.jpg",
                "/src/assets/images/hotels/labranda-tmt-bodrum/220-140_49016831234638c51644f596f56451adaf2281.jpg"
            },
            [5] = new List<string>
            {
                "/src/assets/images/hotels/otium-stone-palace/1200-0_bgblur_b5ea43084b7d403ead9af016cb4944e7.jpg",
                "/src/assets/images/hotels/otium-stone-palace/280-200_4e61ef734e7c4841bb0b0f8827f3f517.jpg",
                "/src/assets/images/hotels/otium-stone-palace/280-200_a9edc123fe6c46cd86ed96fa1aead348.jpg"
            }
        };

        public static List<HotelPlaceInfo> HotelPlaceInfos => new()
        {
            new HotelPlaceInfo
            {
                Id = 1,
                HotelId = 2,
                Address = "Kundu Mevkii, Lara",
                City = "Анталья",
                Country = "Турция",
                DistanceToAirport = "около 15 км до аэропорта Анталья",
                DistanceToCenter = "примерно 17 км до центра Антальи",
                DistanceToBeach = "первая береговая линия, собственный песчано-галечный пляж"
            },
            new HotelPlaceInfo
            {
                Id = 2,
                HotelId = 3,
                Address = "Kundu Mah. Tesisler Cad.",
                City = "Анталья",
                Country = "Турция",
                DistanceToAirport = "около 20 км до аэропорта Анталья",
                DistanceToCenter = "около 20 км до центра",
                DistanceToBeach = "первая береговая линия, песчано-галечный пляж"
            },
            new HotelPlaceInfo
            {
                Id = 3,
                HotelId = 4,
                Address = "Kumbahce Mah. Ataturk Cad. No:180",
                City = "Бодрум",
                Country = "Турция",
                DistanceToAirport = "около 35 км до аэропорта Бодрум",
                DistanceToCenter = "примерно 1,5 км до центра Бодрума",
                DistanceToBeach = "собственная пляжная платформа и небольшая песчано-галечная полоса"
            },
            new HotelPlaceInfo
            {
                Id = 4,
                HotelId = 5,
                Address = "Colakli Mevkii",
                City = "Сиде",
                Country = "Турция",
                DistanceToAirport = "около 55 км до аэропорта Анталья",
                DistanceToCenter = "примерно 12 км до центра Сиде",
                DistanceToBeach = "собственный песчаный пляж, в 450 м от отеля"
            }
        };

        public static List<HotelDescription> HotelDescriptions => new()
        {
            new HotelDescription
            {
                Id = 1,
                HotelId = 2,
                YearOpened = 2002,
                YearRenovated = 2016,
                TotalAreaSquareMeters = 50000,
                BuildingInfo = "Большой семейный отель на первой береговой линии с развитой инфраструктурой и анимацией."
            },
            new HotelDescription
            {
                Id = 2,
                HotelId = 3,
                YearOpened = 1999,
                YearRenovated = 2018,
                TotalAreaSquareMeters = 40000,
                BuildingInfo = "Отель выполнен в стилистике дворца Топкапы, несколько корпусов, большая территория и аквапарк."
            },
            new HotelDescription
            {
                Id = 3,
                HotelId = 4,
                YearOpened = 2004,
                YearRenovated = 2017,
                TotalAreaSquareMeters = 30000,
                BuildingInfo = "Каскадная застройка на склоне, корпуса и бунгало, террасы с видом на Эгейское море."
            },
            new HotelDescription
            {
                Id = 4,
                HotelId = 5,
                YearOpened = 2000,
                YearRenovated = 2015,
                TotalAreaSquareMeters = 35000,
                BuildingInfo = "Комплекс из нескольких корпусов в окружении зелени, плавные дорожки и множество зон отдыха."
            }
        };

        public static List<RoomType> RoomTypes => new()
        {
            new RoomType
            {
                Id = 16,
                HotelId = 2,
                Name = "Standard Room Land View",
                View = "вид на сушу",
                BedConfiguration = "1 двуспальная или 2 односпальные кровати",
                MaxOccupancy = 3,
                AreaSquareMeters = 30
            },

            new RoomType
            {
                Id = 21,
                HotelId = 3,
                Name = "Standard Room",
                View = "сад/бассейн",
                BedConfiguration = "1 двуспальная или 2 односпальные кровати",
                MaxOccupancy = 3,
                AreaSquareMeters = 24
            },
            new RoomType
            {
                Id = 22,
                HotelId = 3,
                Name = "Family Duplex",
                View = "сад",
                BedConfiguration = "1 двуспальная + 2 односпальные кровати (мезонин)",
                MaxOccupancy = 4,
                AreaSquareMeters = 35
            },
            new RoomType
            {
                Id = 17,
                HotelId = 3,
                Name = "Standard Room",
                View = "сад/бассейн",
                BedConfiguration = "1 двуспальная или 2 односпальные кровати",
                MaxOccupancy = 3,
                AreaSquareMeters = 24
            },

            new RoomType
            {
                Id = 10,
                HotelId = 4,
                Name = "Standard Sea View",
                View = "море",
                BedConfiguration = "1 двуспальная кровать",
                MaxOccupancy = 3,
                AreaSquareMeters = 24
            },
            new RoomType
            {
                Id = 11,
                HotelId = 4,
                Name = "Family Room",
                View = "частичный вид на море",
                BedConfiguration = "1 двуспальная + 2 односпальные кровати",
                MaxOccupancy = 4,
                AreaSquareMeters = 30
            },
            new RoomType
            {
                Id = 23,
                HotelId = 4,
                Name = "Standard Garden View",
                View = "сад",
                BedConfiguration = "1 двуспальная или 2 односпальные кровати",
                MaxOccupancy = 3,
                AreaSquareMeters = 22
            },

            new RoomType
            {
                Id = 13,
                HotelId = 5,
                Name = "Family Room",
                View = "сад",
                BedConfiguration = "1 двуспальная + 2 односпальные кровати",
                MaxOccupancy = 4,
                AreaSquareMeters = 32
            },
            new RoomType
            {
                Id = 14,
                HotelId = 5,
                Name = "Large Room",
                View = "сад",
                BedConfiguration = "1 двуспальная + диван-кровать",
                MaxOccupancy = 4,
                AreaSquareMeters = 28
            },
            new RoomType
            {
                Id = 26,
                HotelId = 5,
                Name = "Standard Room",
                View = "сад/бассейн",
                BedConfiguration = "1 двуспальная или 2 односпальные кровати",
                MaxOccupancy = 3,
                AreaSquareMeters = 24
            }
        };

        public static List<MealPlan> MealPlans => new()
        {
            new MealPlan
            {
                Id = 1,
                HotelId = 0,
                Code = "BB",
                Description = "BB — только завтрак. Включает шведский стол на завтрак, разнообразные закуски и безалкогольные напитки. Курение в ресторане запрещено.",
                SmokingAllowedInRestaurant = false
            },
            new MealPlan
            {
                Id = 2,
                HotelId = 0,
                Code = "AI",
                Description = "All Inclusive — завтрак, обед, ужин, закуски в течение дня, местные алкогольные и безалкогольные напитки по концепции отеля.",
                SmokingAllowedInRestaurant = false
            },
            new MealPlan
            {
                Id = 3,
                HotelId = 0,
                Code = "UAI",
                Description = "Ultra All Inclusive — расширенное питание и напитки: круглосуточные бары по концепции, импортные напитки, поздний ужин.",
                SmokingAllowedInRestaurant = false
            },
            new MealPlan
            {
                Id = 4,
                HotelId = 0,
                Code = "FB",
                Description = "Full Board — завтрак, обед и ужин. Напитки включены только во время приёма пищи. Алкоголь зависит от политики отеля.",
                SmokingAllowedInRestaurant = false
            },
            new MealPlan
            {
                Id = 5,
                HotelId = 0,
                Code = "HB",
                Description = "Half Board — завтрак и ужин. Напитки на ужине ограничены правилами отеля. Закуски обычно не входят.",
                SmokingAllowedInRestaurant = false
            },
            new MealPlan
            {
                Id = 6,
                HotelId = 0,
                Code = "RO",
                Description = "Room Only — питание не предоставляется. Все рестораны и бары доступны гостю только за дополнительную плату.",
                SmokingAllowedInRestaurant = false
            }
        };

        public static List<HotelService> HotelServices => new()
        {
            new HotelService { Id = 1, HotelId = 2, Category = "inRoom", Name = "кондиционер" },
            new HotelService { Id = 2, HotelId = 2, Category = "inRoom", Name = "телевизор" },
            new HotelService { Id = 3, HotelId = 2, Category = "inRoom", Name = "мини-бар" },
            new HotelService { Id = 4, HotelId = 2, Category = "inRoom", Name = "сейф" },
            new HotelService { Id = 5, HotelId = 2, Category = "inRoom", Name = "чайный набор" },
            new HotelService { Id = 6, HotelId = 2, Category = "inRoom", Name = "санузел с душем/ванной" },
            new HotelService { Id = 7, HotelId = 2, Category = "forChildren", Name = "мини-клуб" },
            new HotelService { Id = 8, HotelId = 2, Category = "forChildren", Name = "детская анимация" },
            new HotelService { Id = 9, HotelId = 2, Category = "forChildren", Name = "детские горки" },
            new HotelService { Id = 10, HotelId = 2, Category = "forChildren", Name = "детский буфет" },
            new HotelService { Id = 11, HotelId = 2, Category = "onSite", Name = "основной ресторан" },
            new HotelService { Id = 12, HotelId = 2, Category = "onSite", Name = "рестораны a-la carte" },
            new HotelService { Id = 13, HotelId = 2, Category = "onSite", Name = "несколько баров" },
            new HotelService { Id = 14, HotelId = 2, Category = "onSite", Name = "конференц-зал" },
            new HotelService { Id = 15, HotelId = 2, Category = "onSite", Name = "прачечная (платно)" },
            new HotelService { Id = 16, HotelId = 2, Category = "entertainment", Name = "аквапарк" },
            new HotelService { Id = 17, HotelId = 2, Category = "entertainment", Name = "анимация" },
            new HotelService { Id = 18, HotelId = 2, Category = "entertainment", Name = "теннисные корты" },
            new HotelService { Id = 19, HotelId = 2, Category = "entertainment", Name = "фитнес-центр" },
            new HotelService { Id = 20, HotelId = 2, Category = "entertainment", Name = "водные виды спорта (платно)" },
            new HotelService { Id = 21, HotelId = 2, Category = "beach", Name = "первая береговая линия" },
            new HotelService { Id = 22, HotelId = 2, Category = "beach", Name = "песчано-галечный пляж" },
            new HotelService { Id = 23, HotelId = 2, Category = "beach", Name = "лежаки и зонты бесплатно" },
            new HotelService { Id = 24, HotelId = 2, Category = "beach", Name = "пирс" },
            new HotelService { Id = 25, HotelId = 2, Category = "notes", Name = "дресс-код в ресторане" },
            new HotelService { Id = 26, HotelId = 2, Category = "notes", Name = "администрация может изменять концепцию без уведомления" },

            new HotelService { Id = 27, HotelId = 3, Category = "inRoom", Name = "кондиционер" },
            new HotelService { Id = 28, HotelId = 3, Category = "inRoom", Name = "телевизор" },
            new HotelService { Id = 29, HotelId = 3, Category = "inRoom", Name = "мини-бар" },
            new HotelService { Id = 30, HotelId = 3, Category = "inRoom", Name = "чайный набор" },
            new HotelService { Id = 31, HotelId = 3, Category = "inRoom", Name = "сейф" },
            new HotelService { Id = 32, HotelId = 3, Category = "forChildren", Name = "мини-клуб" },
            new HotelService { Id = 33, HotelId = 3, Category = "forChildren", Name = "детский бассейн" },
            new HotelService { Id = 34, HotelId = 3, Category = "forChildren", Name = "игровая площадка" },
            new HotelService { Id = 35, HotelId = 3, Category = "onSite", Name = "главный ресторан" },
            new HotelService { Id = 36, HotelId = 3, Category = "onSite", Name = "рестораны a-la carte" },
            new HotelService { Id = 37, HotelId = 3, Category = "onSite", Name = "несколько баров" },
            new HotelService { Id = 38, HotelId = 3, Category = "onSite", Name = "магазины" },
            new HotelService { Id = 39, HotelId = 3, Category = "onSite", Name = "собственный амфитеатр" },
            new HotelService { Id = 40, HotelId = 3, Category = "entertainment", Name = "аквапарк" },
            new HotelService { Id = 41, HotelId = 3, Category = "entertainment", Name = "вечерние шоу" },
            new HotelService { Id = 42, HotelId = 3, Category = "entertainment", Name = "фитнес-центр" },
            new HotelService { Id = 43, HotelId = 3, Category = "entertainment", Name = "пляжный волейбол" },
            new HotelService { Id = 44, HotelId = 3, Category = "entertainment", Name = "теннисные корты" },
            new HotelService { Id = 45, HotelId = 3, Category = "beach", Name = "первая береговая линия" },
            new HotelService { Id = 46, HotelId = 3, Category = "beach", Name = "песчано-галечный пляж" },
            new HotelService { Id = 47, HotelId = 3, Category = "beach", Name = "лежаки/зонты бесплатно" },

            new HotelService { Id = 48, HotelId = 4, Category = "inRoom", Name = "телевизор" },
            new HotelService { Id = 49, HotelId = 4, Category = "inRoom", Name = "чайный набор" },
            new HotelService { Id = 50, HotelId = 4, Category = "inRoom", Name = "мини-бар" },
            new HotelService { Id = 51, HotelId = 4, Category = "forChildren", Name = "детский бассейн" },
            new HotelService { Id = 52, HotelId = 4, Category = "forChildren", Name = "мини-клуб" },
            new HotelService { Id = 53, HotelId = 4, Category = "forChildren", Name = "анимация для детей" },
            new HotelService { Id = 54, HotelId = 4, Category = "onSite", Name = "главный ресторан" },
            new HotelService { Id = 55, HotelId = 4, Category = "onSite", Name = "бар у бассейна" },
            new HotelService { Id = 56, HotelId = 4, Category = "onSite", Name = "собственная пирс-платформа" },
            new HotelService { Id = 57, HotelId = 4, Category = "entertainment", Name = "дневная и вечерняя анимация" },
            new HotelService { Id = 58, HotelId = 4, Category = "entertainment", Name = "пляжный волейбол" },
            new HotelService { Id = 59, HotelId = 4, Category = "entertainment", Name = "фитнес зал" },
            new HotelService { Id = 60, HotelId = 4, Category = "entertainment", Name = "водные виды спорта (платно)" },
            new HotelService { Id = 61, HotelId = 4, Category = "beach", Name = "пляжная платформа" },
            new HotelService { Id = 62, HotelId = 4, Category = "beach", Name = "песчано-галечный вход" },

            new HotelService { Id = 63, HotelId = 5, Category = "inRoom", Name = "телевизор" },
            new HotelService { Id = 64, HotelId = 5, Category = "inRoom", Name = "сейф" },
            new HotelService { Id = 65, HotelId = 5, Category = "inRoom", Name = "мини-бар" },
            new HotelService { Id = 66, HotelId = 5, Category = "inRoom", Name = "чайный набор" },
            new HotelService { Id = 67, HotelId = 5, Category = "forChildren", Name = "мини-клуб" },
            new HotelService { Id = 68, HotelId = 5, Category = "forChildren", Name = "детская площадка" },
            new HotelService { Id = 69, HotelId = 5, Category = "forChildren", Name = "мини-диско" },
            new HotelService { Id = 70, HotelId = 5, Category = "onSite", Name = "главный ресторан" },
            new HotelService { Id = 71, HotelId = 5, Category = "onSite", Name = "рестораны a-la carte" },
            new HotelService { Id = 72, HotelId = 5, Category = "onSite", Name = "бары на территории" },
            new HotelService { Id = 73, HotelId = 5, Category = "onSite", Name = "магазины" },
            new HotelService { Id = 74, HotelId = 5, Category = "entertainment", Name = "анимация" },
            new HotelService { Id = 75, HotelId = 5, Category = "entertainment", Name = "аквапарк" },
            new HotelService { Id = 76, HotelId = 5, Category = "entertainment", Name = "теннисные корты" },
            new HotelService { Id = 77, HotelId = 5, Category = "entertainment", Name = "фитнес зал" },
            new HotelService { Id = 78, HotelId = 5, Category = "beach", Name = "собственный песчаный пляж" },
            new HotelService { Id = 79, HotelId = 5, Category = "beach", Name = "трансфер до пляжа" },
            new HotelService { Id = 80, HotelId = 5, Category = "notes", Name = "администрация оставляет за собой право изменять концепцию питания" },
            new HotelService { Id = 81, HotelId = 5, Category = "notes", Name = "возможны изменения в расписании анимации" }
        };
    }
}