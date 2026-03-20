namespace OneToche.API.DTO
{
    public class TourFilterQueryDTO
    {
        public int? CountryId { get; set; }
        public int? CityId { get; set; }
        public int? CategoryId { get; set; }
        public string? MealPlan { get; set; }
        public string? HotelType { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTo { get; set; }
    }
}
