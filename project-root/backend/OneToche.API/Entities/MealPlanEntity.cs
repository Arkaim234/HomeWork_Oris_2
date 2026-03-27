namespace OneToche.API.Entities
{
    public class MealPlanEntity
    {
        public int Id { get; set; }

        public string Code { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public bool SmokingAllowedInRestaurant { get; set; }

        public ICollection<HotelMealPlanEntity> HotelMealPlans { get; set; } = new List<HotelMealPlanEntity>();
    }
}