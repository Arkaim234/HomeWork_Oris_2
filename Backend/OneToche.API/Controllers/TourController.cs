using Microsoft.AspNetCore.Mvc;
using OneToche.API.data;
using OneToche.API.DTO;
using MiniHttpServer.Model;

namespace OneToche.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Hotel>> GetAllTours([FromQuery] TourFilterQueryDTO filter)
        {
            var query = DataSeed.Hotels.AsEnumerable();

            if (filter.CountryId.HasValue)
            {
                var cityIds = DataSeed.Cities
                    .Where(c => c.CountryId == filter.CountryId.Value)
                    .Select(c => c.Id)
                    .ToHashSet();

                query = query.Where(h => cityIds.Contains(h.CityId));
            }

            if (filter.CityId.HasValue)
            {
                query = query.Where(h => h.CityId == filter.CityId.Value);
            }

            if (filter.CategoryId.HasValue)
            {
                var hotelIds = DataSeed.HotelCategoryMaps
                    .Where(x => x.CategoryId == filter.CategoryId.Value)
                    .Select(x => x.HotelId)
                    .ToHashSet();

                query = query.Where(h => hotelIds.Contains(h.Id));
            }

            if (!string.IsNullOrWhiteSpace(filter.MealPlan))
            {
                query = query.Where(h => h.MealPlans.Contains(filter.MealPlan));
            }

            if (!string.IsNullOrWhiteSpace(filter.HotelType))
            {
                query = query.Where(h =>
                    string.Equals(h.HotelType, filter.HotelType, StringComparison.OrdinalIgnoreCase));
            }

            if (filter.PriceFrom.HasValue)
            {
                query = query.Where(h => h.Price >= filter.PriceFrom.Value);
            }

            //мб на будующее
            //if (filter.PriceTo.HasValue)
            //{
            //    query = query.Where(h => h.Price <= filter.PriceTo.Value);
            //}

            return Ok(query.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Hotel> GetTourById(int id)
        {
            var hotel = DataSeed.Hotels.FirstOrDefault(x => x.Id == id);

            if (hotel == null)
                return NotFound(new { message = "Тур не найден" });

            return Ok(hotel);
        }

        [HttpGet("{id}/description")]
        public ActionResult<TourDescriptionDTOResponse> GetDescriptionTab(int id)
        {
            var hotel = DataSeed.Hotels.FirstOrDefault(x => x.Id == id);
            if (hotel == null)
                return NotFound(new { message = "Тур не найден" });

            var placeInfo = DataSeed.HotelPlaceInfos.FirstOrDefault(x => x.HotelId == id);
            var description = DataSeed.HotelDescriptions.FirstOrDefault(x => x.HotelId == id);

            var notes = DataSeed.HotelServices
                .Where(x => x.HotelId == id && x.Category == "notes")
                .Select(x => x.Name)
                .ToList();

            var result = new TourDescriptionDTOResponse
            {
                Photos = DataSeed.HotelPhotos.ContainsKey(id)
                    ? DataSeed.HotelPhotos[id]
                    : new List<string>(),

                Location = placeInfo == null
                    ? string.Empty
                    : $"{placeInfo.Address}. {placeInfo.DistanceToAirport}. {placeInfo.DistanceToCenter}.",

                Beach = placeInfo?.DistanceToBeach ?? string.Empty,

                MainInfo = description == null
                    ? string.Empty
                    : $"Отель был открыт в {description.YearOpened} году, последний ремонт проводился в {description.YearRenovated} году. Общая площадь территории составляет {description.TotalAreaSquareMeters} кв.м. {description.BuildingInfo}",

                Contacts = string.Join(" ", hotel.Contacts),

                Notes = string.Join(" ", notes)
            };

            return Ok(result);
        }

        [HttpGet("{id}/rooms")]
        public ActionResult<TourRoomsDTOResponse> GetRoomsTab(int id)
        {
            var hotel = DataSeed.Hotels.FirstOrDefault(x => x.Id == id);
            if (hotel == null)
                return NotFound(new { message = "Тур не найден" });

            var inRoom = DataSeed.HotelServices
                .Where(x => x.HotelId == id && x.Category == "inRoom")
                .Select(x => x.Name)
                .ToList();

            var roomDescriptions = DataSeed.RoomTypes
                .Where(x => x.HotelId == id)
                .Select(x =>
                    $"{x.Name} ({x.View}; {x.BedConfiguration}; макс. {x.MaxOccupancy} чел.; {x.AreaSquareMeters} м2)")
                .ToList();

            var result = new TourRoomsDTOResponse
            {
                InRoom = inRoom,
                RoomDescriptions = roomDescriptions
            };

            return Ok(result);
        }

        [HttpGet("{id}/infrastructure")]
        public ActionResult<TourInfrastructureDTOResponse> GetInfrastructureTab(int id)
        {
            var hotel = DataSeed.Hotels.FirstOrDefault(x => x.Id == id);
            if (hotel == null)
                return NotFound(new { message = "Тур не найден" });

            var mealPlanText = string.Join(" / ", hotel.MealPlans);

            var forChildren = DataSeed.HotelServices
                .Where(x => x.HotelId == id && x.Category == "forChildren")
                .Select(x => x.Name)
                .ToList();

            var entertainment = DataSeed.HotelServices
                .Where(x => x.HotelId == id && x.Category == "entertainment")
                .Select(x => x.Name)
                .ToList();

            var onSite = DataSeed.HotelServices
                .Where(x => x.HotelId == id &&
                           (x.Category == "onSite" || x.Category == "beach"))
                .Select(x => x.Name)
                .ToList();

            var result = new TourInfrastructureDTOResponse
            {
                Nutrition = mealPlanText,
                ForChildren = forChildren,
                Entertainment = entertainment,
                OnSite = onSite
            };

            return Ok(result);
        }
    }
}