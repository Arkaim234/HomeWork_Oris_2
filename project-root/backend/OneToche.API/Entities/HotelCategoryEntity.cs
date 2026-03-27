namespace OneToche.API.Entities
{
    public class HotelCategoryEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<HotelCategoryMapEntity> HotelCategoryMaps { get; set; } = new List<HotelCategoryMapEntity>();
    }
}