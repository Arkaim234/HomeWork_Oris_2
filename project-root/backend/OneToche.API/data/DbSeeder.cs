using OneToche.API.Entities;
using OneToche.API.data;

namespace OneToche.API.data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Countries.Any())
                return;

            var countries = DataSeed.Countries
                .Select(x => new CountryEntity
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToList();

            var cities = DataSeed.Cities
                .Select(x => new CityEntity
                {
                    Id = x.Id,
                    Name = x.Name,
                    CountryId = x.CountryId
                })
                .ToList();

            var categories = DataSeed.Categories
                .Select(x => new HotelCategoryEntity
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToList();

            var hotels = DataSeed.Hotels
                .Select(x => new HotelEntity
                {
                    Id = x.Id,
                    Name = x.Name,
                    Slug = x.Slug,
                    CityId = x.CityId,
                    HotelType = x.HotelType,
                    Description = x.Description,
                    PhotoUrl = x.PhotoUrl,
                    Price = x.Price
                })
                .ToList();

            var hotelCategoryMaps = DataSeed.HotelCategoryMaps
                .Select(x => new HotelCategoryMapEntity
                {
                    HotelId = x.HotelId,
                    CategoryId = x.CategoryId
                })
                .ToList();

            var hotelPlaceInfos = DataSeed.HotelPlaceInfos
                .Select(x => new HotelPlaceInfoEntity
                {
                    Id = x.Id,
                    HotelId = x.HotelId,
                    Address = x.Address,
                    City = x.City,
                    Country = x.Country,
                    DistanceToAirport = x.DistanceToAirport,
                    DistanceToCenter = x.DistanceToCenter,
                    DistanceToBeach = x.DistanceToBeach
                })
                .ToList();

            var hotelDescriptions = DataSeed.HotelDescriptions
                .Select(x => new HotelDescriptionEntity
                {
                    Id = x.Id,
                    HotelId = x.HotelId,
                    YearOpened = x.YearOpened,
                    YearRenovated = x.YearRenovated,
                    TotalAreaSquareMeters = x.TotalAreaSquareMeters,
                    BuildingInfo = x.BuildingInfo
                })
                .ToList();

            var hotelServices = DataSeed.HotelServices
                .Select(x => new HotelServiceEntity
                {
                    Id = x.Id,
                    HotelId = x.HotelId,
                    Category = x.Category,
                    Name = x.Name
                })
                .ToList();

            var roomTypes = DataSeed.RoomTypes
                .Select(x => new RoomTypeEntity
                {
                    Id = x.Id,
                    HotelId = x.HotelId,
                    Name = x.Name,
                    View = x.View,
                    BedConfiguration = x.BedConfiguration,
                    MaxOccupancy = x.MaxOccupancy,
                    AreaSquareMeters = x.AreaSquareMeters
                })
                .ToList();

            var mealPlans = DataSeed.MealPlans
                .Select(x => new MealPlanEntity
                {
                    Id = x.Id,
                    Code = x.Code,
                    Description = x.Description,
                    SmokingAllowedInRestaurant = x.SmokingAllowedInRestaurant
                })
                .ToList();

            context.Countries.AddRange(countries);
            context.Cities.AddRange(cities);
            context.HotelCategories.AddRange(categories);
            context.Hotels.AddRange(hotels);
            context.HotelCategoryMaps.AddRange(hotelCategoryMaps);
            context.HotelPlaceInfos.AddRange(hotelPlaceInfos);
            context.HotelDescriptions.AddRange(hotelDescriptions);
            context.HotelServices.AddRange(hotelServices);
            context.RoomTypes.AddRange(roomTypes);
            context.MealPlans.AddRange(mealPlans);

            var mealPlanCodeToId = mealPlans.ToDictionary(x => x.Code, x => x.Id);

            var hotelMealPlans = new List<HotelMealPlanEntity>();
            foreach (var hotel in DataSeed.Hotels)
            {
                if (hotel.MealPlans == null)
                    continue;

                foreach (var mealCode in hotel.MealPlans.Distinct())
                {
                    if (mealPlanCodeToId.TryGetValue(mealCode, out var mealPlanId))
                    {
                        hotelMealPlans.Add(new HotelMealPlanEntity
                        {
                            HotelId = hotel.Id,
                            MealPlanId = mealPlanId
                        });
                    }
                }
            }

            context.HotelMealPlans.AddRange(hotelMealPlans);

            var hotelPhotos = new List<HotelPhotoEntity>();
            int photoId = 1;

            foreach (var pair in DataSeed.HotelPhotos)
            {
                foreach (var url in pair.Value)
                {
                    hotelPhotos.Add(new HotelPhotoEntity
                    {
                        Id = photoId++,
                        HotelId = pair.Key,
                        Url = url
                    });
                }
            }

            context.HotelPhotos.AddRange(hotelPhotos);

            context.SaveChanges();
        }
    }
}