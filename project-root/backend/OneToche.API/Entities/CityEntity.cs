namespace OneToche.API.Entities
{
    public class CityEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public int CountryId { get; set; }
        public CountryEntity Country { get; set; } = null!;

        public ICollection<HotelEntity> Hotels { get; set; } = new List<HotelEntity>();
    }
}