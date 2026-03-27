namespace OneToche.API.Entities
{
    public class HotelServiceEntity
    {
        public int Id { get; set; }

        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public string Category { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
}