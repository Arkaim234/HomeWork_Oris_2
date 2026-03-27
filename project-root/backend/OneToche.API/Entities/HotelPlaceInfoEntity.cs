namespace OneToche.API.Entities
{
    public class HotelPlaceInfoEntity
    {
        public int Id { get; set; }

        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public string DistanceToAirport { get; set; } = string.Empty;
        public string DistanceToCenter { get; set; } = string.Empty;
        public string DistanceToBeach { get; set; } = string.Empty;
    }
}