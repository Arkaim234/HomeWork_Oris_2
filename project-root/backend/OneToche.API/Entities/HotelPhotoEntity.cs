namespace OneToche.API.Entities
{
    public class HotelPhotoEntity
    {
        public int Id { get; set; }

        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public string Url { get; set; } = string.Empty;
    }
}