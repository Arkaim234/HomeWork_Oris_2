using Microsoft.EntityFrameworkCore;
using OneToche.API.data;
using OneToche.API.DTO;
using OneToche.API.Entities;

namespace OneToche.API.Services
{
    public class TourService : ITourService
    {
        private readonly AppDbContext _context;

        public TourService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<HotelEntity>> GetAllAsync(TourFilterQueryDTO filter)
        {
            var query = _context.Hotels.AsNoTracking().AsQueryable();

            if (filter.CountryId.HasValue)
            {
                var cityIds = await _context.Cities
                    .Where(c => c.CountryId == filter.CountryId.Value)
                    .Select(c => c.Id)
                    .ToListAsync();

                query = query.Where(h => cityIds.Contains(h.CityId));
            }

            if (filter.CityId.HasValue)
            {
                query = query.Where(h => h.CityId == filter.CityId.Value);
            }

            if (filter.CategoryId.HasValue)
            {
                var hotelIds = await _context.HotelCategoryMaps
                    .Where(x => x.CategoryId == filter.CategoryId.Value)
                    .Select(x => x.HotelId)
                    .ToListAsync();

                query = query.Where(h => hotelIds.Contains(h.Id));
            }

            if (!string.IsNullOrWhiteSpace(filter.MealPlan))
            {
                var mealPlanIds = await _context.MealPlans
                    .Where(x => x.Code == filter.MealPlan)
                    .Select(x => x.Id)
                    .ToListAsync();

                var hotelIds = await _context.HotelMealPlans
                    .Where(x => mealPlanIds.Contains(x.MealPlanId))
                    .Select(x => x.HotelId)
                    .ToListAsync();

                query = query.Where(h => hotelIds.Contains(h.Id));
            }

            if (!string.IsNullOrWhiteSpace(filter.HotelType))
            {
                query = query.Where(h => h.HotelType.ToLower() == filter.HotelType.ToLower());
            }

            if (filter.PriceFrom.HasValue)
            {
                query = query.Where(h => h.Price >= filter.PriceFrom.Value);
            }

            if (filter.PriceTo.HasValue)
            {
                query = query.Where(h => h.Price <= filter.PriceTo.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<TourUpsertDTO?> GetByIdAsync(int id)
        {
            var hotel = await LoadHotelFullReadOnlyAsync(id);

            if (hotel == null)
                return null;

            return MapToDto(hotel);
        }

        public async Task<ServiceResult<TourUpsertDTO>> CreateAsync(TourUpsertDTO dto)
        {
            var validationError = await ValidateDtoAsync(dto);
            if (validationError != null)
                return ServiceResult<TourUpsertDTO>.Fail(validationError);

            var hotelId = await GetNextIdAsync(_context.Hotels.Select(x => x.Id));

            var hotel = new HotelEntity
            {
                Id = hotelId,
                Name = dto.Name,
                Slug = dto.Slug,
                CityId = dto.CityId,
                HotelType = dto.HotelType,
                Description = dto.Description,
                PhotoUrl = dto.PhotoUrl,
                Price = dto.Price
            };

            _context.Hotels.Add(hotel);

            await AddHotelChildrenAsync(hotelId, dto);
            await _context.SaveChangesAsync();

            var createdHotel = await LoadHotelFullReadOnlyAsync(hotelId);

            return ServiceResult<TourUpsertDTO>.Ok(MapToDto(createdHotel!));
        }

        public async Task<ServiceResult<TourUpsertDTO>> UpdateAsync(int id, TourUpsertDTO dto)
        {
            var hotel = await LoadHotelFullForUpdateAsync(id);

            if (hotel == null)
                return ServiceResult<TourUpsertDTO>.Fail("Тур не найден");

            var validationError = await ValidateDtoAsync(dto);
            if (validationError != null)
                return ServiceResult<TourUpsertDTO>.Fail(validationError);

            hotel.Name = dto.Name;
            hotel.Slug = dto.Slug;
            hotel.CityId = dto.CityId;
            hotel.HotelType = dto.HotelType;
            hotel.Description = dto.Description;
            hotel.PhotoUrl = dto.PhotoUrl;
            hotel.Price = dto.Price;

            _context.HotelDescriptions.RemoveRange(hotel.HotelDescriptions);
            _context.HotelPlaceInfos.RemoveRange(hotel.HotelPlaceInfos);
            _context.HotelCategoryMaps.RemoveRange(hotel.HotelCategoryMaps);
            _context.HotelMealPlans.RemoveRange(hotel.HotelMealPlans);
            _context.HotelPhotos.RemoveRange(hotel.HotelPhotos);
            _context.HotelServices.RemoveRange(hotel.HotelServices);
            _context.RoomTypes.RemoveRange(hotel.RoomTypes);

            await AddHotelChildrenAsync(hotel.Id, dto);
            await _context.SaveChangesAsync();

            var updatedHotel = await LoadHotelFullReadOnlyAsync(id);

            return ServiceResult<TourUpsertDTO>.Ok(MapToDto(updatedHotel!));
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(x => x.Id == id);

            if (hotel == null)
                return false;

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<TourDescriptionDTOResponse?> GetDescriptionAsync(int id)
        {
            var hotel = await _context.Hotels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (hotel == null)
                return null;

            var placeInfo = await _context.HotelPlaceInfos.AsNoTracking().FirstOrDefaultAsync(x => x.HotelId == id);
            var description = await _context.HotelDescriptions.AsNoTracking().FirstOrDefaultAsync(x => x.HotelId == id);

            var notes = await _context.HotelServices
                .AsNoTracking()
                .Where(x => x.HotelId == id && x.Category == "notes")
                .Select(x => x.Name)
                .ToListAsync();

            var photos = await _context.HotelPhotos
                .AsNoTracking()
                .Where(x => x.HotelId == id)
                .Select(x => x.Url)
                .ToListAsync();

            return new TourDescriptionDTOResponse
            {
                Photos = photos,
                Location = placeInfo == null
                    ? string.Empty
                    : $"{placeInfo.Address}. {placeInfo.DistanceToAirport}. {placeInfo.DistanceToCenter}.",
                Beach = placeInfo?.DistanceToBeach ?? string.Empty,
                MainInfo = description == null
                    ? string.Empty
                    : $"Отель был открыт в {description.YearOpened} году, последний ремонт проводился в {description.YearRenovated} году. Общая площадь территории составляет {description.TotalAreaSquareMeters} кв.м. {description.BuildingInfo}",
                Contacts = string.Empty,
                Notes = string.Join(" ", notes)
            };
        }

        public async Task<TourRoomsDTOResponse?> GetRoomsAsync(int id)
        {
            var hotel = await _context.Hotels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (hotel == null)
                return null;

            var inRoom = await _context.HotelServices
                .AsNoTracking()
                .Where(x => x.HotelId == id && x.Category == "inRoom")
                .Select(x => x.Name)
                .ToListAsync();

            var roomDescriptions = await _context.RoomTypes
                .AsNoTracking()
                .Where(x => x.HotelId == id)
                .Select(x => $"{x.Name} ({x.View}; {x.BedConfiguration}; макс. {x.MaxOccupancy} чел.; {x.AreaSquareMeters} м2)")
                .ToListAsync();

            return new TourRoomsDTOResponse
            {
                InRoom = inRoom,
                RoomDescriptions = roomDescriptions
            };
        }

        public async Task<TourInfrastructureDTOResponse?> GetInfrastructureAsync(int id)
        {
            var hotel = await _context.Hotels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (hotel == null)
                return null;

            var mealPlanCodes = await (
                from hmp in _context.HotelMealPlans.AsNoTracking()
                join mp in _context.MealPlans.AsNoTracking() on hmp.MealPlanId equals mp.Id
                where hmp.HotelId == id
                select mp.Code
            ).ToListAsync();

            var forChildren = await _context.HotelServices
                .AsNoTracking()
                .Where(x => x.HotelId == id && x.Category == "forChildren")
                .Select(x => x.Name)
                .ToListAsync();

            var entertainment = await _context.HotelServices
                .AsNoTracking()
                .Where(x => x.HotelId == id && x.Category == "entertainment")
                .Select(x => x.Name)
                .ToListAsync();

            var onSite = await _context.HotelServices
                .AsNoTracking()
                .Where(x => x.HotelId == id && (x.Category == "onSite" || x.Category == "beach"))
                .Select(x => x.Name)
                .ToListAsync();

            return new TourInfrastructureDTOResponse
            {
                Nutrition = string.Join(" / ", mealPlanCodes),
                ForChildren = forChildren,
                Entertainment = entertainment,
                OnSite = onSite
            };
        }

        private async Task<HotelEntity?> LoadHotelFullForUpdateAsync(int id)
        {
            return await _context.Hotels
                .Include(x => x.HotelDescriptions)
                .Include(x => x.HotelPlaceInfos)
                .Include(x => x.HotelCategoryMaps)
                .Include(x => x.HotelMealPlans)
                .Include(x => x.HotelPhotos)
                .Include(x => x.HotelServices)
                .Include(x => x.RoomTypes)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private async Task<HotelEntity?> LoadHotelFullReadOnlyAsync(int id)
        {
            return await _context.Hotels
                .AsNoTracking()
                .Include(x => x.HotelDescriptions)
                .Include(x => x.HotelPlaceInfos)
                .Include(x => x.HotelCategoryMaps)
                .Include(x => x.HotelMealPlans)
                .Include(x => x.HotelPhotos)
                .Include(x => x.HotelServices)
                .Include(x => x.RoomTypes)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private static TourUpsertDTO MapToDto(HotelEntity hotel)
        {
            var description = hotel.HotelDescriptions.FirstOrDefault();
            var placeInfo = hotel.HotelPlaceInfos.FirstOrDefault();

            return new TourUpsertDTO
            {
                Id = hotel.Id,
                Name = hotel.Name,
                Slug = hotel.Slug,
                CityId = hotel.CityId,
                HotelType = hotel.HotelType,
                Description = hotel.Description,
                PhotoUrl = hotel.PhotoUrl,
                Price = hotel.Price,

                YearOpened = description?.YearOpened ?? 0,
                YearRenovated = description?.YearRenovated ?? 0,
                TotalAreaSquareMeters = description?.TotalAreaSquareMeters ?? 0,
                BuildingInfo = description?.BuildingInfo ?? string.Empty,

                Address = placeInfo?.Address ?? string.Empty,
                PlaceCity = placeInfo?.City ?? string.Empty,
                Country = placeInfo?.Country ?? string.Empty,
                DistanceToAirport = placeInfo?.DistanceToAirport ?? string.Empty,
                DistanceToCenter = placeInfo?.DistanceToCenter ?? string.Empty,
                DistanceToBeach = placeInfo?.DistanceToBeach ?? string.Empty,

                CategoryIds = hotel.HotelCategoryMaps.Select(x => x.CategoryId).ToList(),
                MealPlanIds = hotel.HotelMealPlans.Select(x => x.MealPlanId).ToList(),
                Photos = hotel.HotelPhotos.Select(x => x.Url).ToList(),

                InRoom = hotel.HotelServices.Where(x => x.Category == "inRoom").Select(x => x.Name).ToList(),
                ForChildren = hotel.HotelServices.Where(x => x.Category == "forChildren").Select(x => x.Name).ToList(),
                Entertainment = hotel.HotelServices.Where(x => x.Category == "entertainment").Select(x => x.Name).ToList(),
                OnSite = hotel.HotelServices.Where(x => x.Category == "onSite").Select(x => x.Name).ToList(),
                BeachServices = hotel.HotelServices.Where(x => x.Category == "beach").Select(x => x.Name).ToList(),
                Notes = hotel.HotelServices.Where(x => x.Category == "notes").Select(x => x.Name).ToList(),

                RoomTypes = hotel.RoomTypes
                    .Select(x => new TourUpsertDTO.RoomTypeItem
                    {
                        Name = x.Name,
                        View = x.View,
                        BedConfiguration = x.BedConfiguration,
                        MaxOccupancy = x.MaxOccupancy,
                        AreaSquareMeters = x.AreaSquareMeters
                    })
                    .ToList()
            };
        }

        private async Task<string?> ValidateDtoAsync(TourUpsertDTO dto)
        {
            var cityExists = await _context.Cities.AnyAsync(x => x.Id == dto.CityId);
            if (!cityExists)
                return "Город не найден";

            var categoryIds = (dto.CategoryIds ?? new List<int>()).Distinct().ToList();
            if (categoryIds.Count > 0)
            {
                var validCategoryCount = await _context.HotelCategories.CountAsync(x => categoryIds.Contains(x.Id));
                if (validCategoryCount != categoryIds.Count)
                    return "Одна или несколько категорий не найдены";
            }

            var mealPlanIds = (dto.MealPlanIds ?? new List<int>()).Distinct().ToList();
            if (mealPlanIds.Count > 0)
            {
                var validMealPlanCount = await _context.MealPlans.CountAsync(x => mealPlanIds.Contains(x.Id));
                if (validMealPlanCount != mealPlanIds.Count)
                    return "Один или несколько планов питания не найдены";
            }

            return null;
        }

        private async Task AddHotelChildrenAsync(int hotelId, TourUpsertDTO dto)
        {
            if (HasDescriptionData(dto))
            {
                var nextDescriptionId = await GetNextIdAsync(_context.HotelDescriptions.Select(x => x.Id));

                _context.HotelDescriptions.Add(new HotelDescriptionEntity
                {
                    Id = nextDescriptionId,
                    HotelId = hotelId,
                    YearOpened = dto.YearOpened,
                    YearRenovated = dto.YearRenovated,
                    TotalAreaSquareMeters = dto.TotalAreaSquareMeters,
                    BuildingInfo = dto.BuildingInfo
                });
            }

            if (HasPlaceInfoData(dto))
            {
                var nextPlaceInfoId = await GetNextIdAsync(_context.HotelPlaceInfos.Select(x => x.Id));

                _context.HotelPlaceInfos.Add(new HotelPlaceInfoEntity
                {
                    Id = nextPlaceInfoId,
                    HotelId = hotelId,
                    Address = dto.Address,
                    City = dto.PlaceCity,
                    Country = dto.Country,
                    DistanceToAirport = dto.DistanceToAirport,
                    DistanceToCenter = dto.DistanceToCenter,
                    DistanceToBeach = dto.DistanceToBeach
                });
            }

            foreach (var categoryId in (dto.CategoryIds ?? new List<int>()).Distinct())
            {
                _context.HotelCategoryMaps.Add(new HotelCategoryMapEntity
                {
                    HotelId = hotelId,
                    CategoryId = categoryId
                });
            }

            foreach (var mealPlanId in (dto.MealPlanIds ?? new List<int>()).Distinct())
            {
                _context.HotelMealPlans.Add(new HotelMealPlanEntity
                {
                    HotelId = hotelId,
                    MealPlanId = mealPlanId
                });
            }

            var nextPhotoId = await GetNextIdAsync(_context.HotelPhotos.Select(x => x.Id));
            foreach (var url in NormalizeStrings(dto.Photos ?? new List<string>()))
            {
                _context.HotelPhotos.Add(new HotelPhotoEntity
                {
                    Id = nextPhotoId++,
                    HotelId = hotelId,
                    Url = url
                });
            }

            var nextServiceId = await GetNextIdAsync(_context.HotelServices.Select(x => x.Id));
            nextServiceId = AddServices(hotelId, dto.InRoom ?? new List<string>(), "inRoom", nextServiceId);
            nextServiceId = AddServices(hotelId, dto.ForChildren ?? new List<string>(), "forChildren", nextServiceId);
            nextServiceId = AddServices(hotelId, dto.Entertainment ?? new List<string>(), "entertainment", nextServiceId);
            nextServiceId = AddServices(hotelId, dto.OnSite ?? new List<string>(), "onSite", nextServiceId);
            nextServiceId = AddServices(hotelId, dto.BeachServices ?? new List<string>(), "beach", nextServiceId);
            _ = AddServices(hotelId, dto.Notes ?? new List<string>(), "notes", nextServiceId);

            var nextRoomTypeId = await GetNextIdAsync(_context.RoomTypes.Select(x => x.Id));
            foreach (var room in (dto.RoomTypes ?? new List<TourUpsertDTO.RoomTypeItem>())
                .Where(x => !string.IsNullOrWhiteSpace(x.Name)))
            {
                _context.RoomTypes.Add(new RoomTypeEntity
                {
                    Id = nextRoomTypeId++,
                    HotelId = hotelId,
                    Name = room.Name,
                    View = room.View,
                    BedConfiguration = room.BedConfiguration,
                    MaxOccupancy = room.MaxOccupancy,
                    AreaSquareMeters = room.AreaSquareMeters
                });
            }
        }

        private int AddServices(int hotelId, IEnumerable<string> values, string category, int startId)
        {
            var nextId = startId;

            foreach (var name in NormalizeStrings(values))
            {
                _context.HotelServices.Add(new HotelServiceEntity
                {
                    Id = nextId++,
                    HotelId = hotelId,
                    Category = category,
                    Name = name
                });
            }

            return nextId;
        }

        private static List<string> NormalizeStrings(IEnumerable<string> values)
        {
            return values
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Select(x => x.Trim())
                .Distinct()
                .ToList();
        }

        private static bool HasDescriptionData(TourUpsertDTO dto)
        {
            return dto.YearOpened != 0
                   || dto.YearRenovated != 0
                   || dto.TotalAreaSquareMeters != 0
                   || !string.IsNullOrWhiteSpace(dto.BuildingInfo);
        }

        private static bool HasPlaceInfoData(TourUpsertDTO dto)
        {
            return !string.IsNullOrWhiteSpace(dto.Address)
                   || !string.IsNullOrWhiteSpace(dto.PlaceCity)
                   || !string.IsNullOrWhiteSpace(dto.Country)
                   || !string.IsNullOrWhiteSpace(dto.DistanceToAirport)
                   || !string.IsNullOrWhiteSpace(dto.DistanceToCenter)
                   || !string.IsNullOrWhiteSpace(dto.DistanceToBeach);
        }

        private async Task<int> GetNextIdAsync(IQueryable<int> idsQuery)
        {
            return await idsQuery.AnyAsync()
                ? await idsQuery.MaxAsync() + 1
                : 1;
        }
    }
}