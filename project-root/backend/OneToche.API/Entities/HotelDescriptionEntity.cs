namespace OneToche.API.Entities
{
    public class HotelDescriptionEntity
    {
        public int Id { get; set; }

        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public int YearOpened { get; set; }
        public int YearRenovated { get; set; }

        public decimal TotalAreaSquareMeters { get; set; }
        public string BuildingInfo { get; set; } = string.Empty;
    }
}