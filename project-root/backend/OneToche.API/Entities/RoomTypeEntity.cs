namespace OneToche.API.Entities
{
    public class RoomTypeEntity
    {
        public int Id { get; set; }

        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public string Name { get; set; } = string.Empty;
        public string View { get; set; } = string.Empty;
        public string BedConfiguration { get; set; } = string.Empty;

        public int MaxOccupancy { get; set; }
        public int AreaSquareMeters { get; set; }
    }
}