namespace OneToche.API.Entities
{
    public class HotelMealPlanEntity
    {
        public int HotelId { get; set; }
        public HotelEntity Hotel { get; set; } = null!;

        public int MealPlanId { get; set; }
        public MealPlanEntity MealPlan { get; set; } = null!;
    }
}