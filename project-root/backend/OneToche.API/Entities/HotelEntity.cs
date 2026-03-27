namespace OneToche.API.Entities
{
    public class HotelEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        public int CityId { get; set; }
        public CityEntity City { get; set; } = null!;

        public string HotelType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PhotoUrl { get; set; } = string.Empty;
        public int Price { get; set; }

        public ICollection<HotelCategoryMapEntity> HotelCategoryMaps { get; set; } = new List<HotelCategoryMapEntity>();
        public ICollection<HotelDescriptionEntity> HotelDescriptions { get; set; } = new List<HotelDescriptionEntity>();
        public ICollection<HotelPlaceInfoEntity> HotelPlaceInfos { get; set; } = new List<HotelPlaceInfoEntity>();
        public ICollection<HotelServiceEntity> HotelServices { get; set; } = new List<HotelServiceEntity>();
        public ICollection<RoomTypeEntity> RoomTypes { get; set; } = new List<RoomTypeEntity>();
        public ICollection<HotelPhotoEntity> HotelPhotos { get; set; } = new List<HotelPhotoEntity>();
        public ICollection<HotelMealPlanEntity> HotelMealPlans { get; set; } = new List<HotelMealPlanEntity>();
    }
}