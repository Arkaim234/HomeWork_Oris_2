namespace OneToche.API.Entities
{
    public class HotelCategoryMapEntity
    {
        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public int CategoryId { get; set; }
        public HotelCategoryEntity Category { get; set; } = null!;
    }
}