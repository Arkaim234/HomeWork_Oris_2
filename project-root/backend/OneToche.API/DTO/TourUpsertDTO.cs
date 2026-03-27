namespace OneToche.API.DTO
{
    public class TourUpsertDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public int CityId { get; set; }
        public string HotelType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PhotoUrl { get; set; } = string.Empty;
        public int Price { get; set; }

        public int YearOpened { get; set; }
        public int YearRenovated { get; set; }
        public decimal TotalAreaSquareMeters { get; set; }
        public string BuildingInfo { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;
        public string PlaceCity { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string DistanceToAirport { get; set; } = string.Empty;
        public string DistanceToCenter { get; set; } = string.Empty;
        public string DistanceToBeach { get; set; } = string.Empty;

        public List<int> CategoryIds { get; set; } = new();
        public List<int> MealPlanIds { get; set; } = new();
        public List<string> Photos { get; set; } = new();

        public List<string> InRoom { get; set; } = new();
        public List<string> ForChildren { get; set; } = new();
        public List<string> Entertainment { get; set; } = new();
        public List<string> OnSite { get; set; } = new();
        public List<string> BeachServices { get; set; } = new();
        public List<string> Notes { get; set; } = new();

        public List<RoomTypeItem> RoomTypes { get; set; } = new();

        public class RoomTypeItem
        {
            public string Name { get; set; } = string.Empty;
            public string View { get; set; } = string.Empty;
            public string BedConfiguration { get; set; } = string.Empty;
            public int MaxOccupancy { get; set; }
            public int AreaSquareMeters { get; set; }
        }
    }
}