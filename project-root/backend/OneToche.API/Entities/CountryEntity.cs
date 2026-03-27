namespace OneToche.API.Entities
{
    public class CountryEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<CityEntity> Cities { get; set; } = new List<CityEntity>();
    }
}