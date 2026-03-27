namespace OneToche.API.DTO
{
    public class TourInfrastructureDTOResponse
    {
        public string Nutrition { get; set; } = string.Empty;
        public List<string> ForChildren { get; set; } = new();
        public List<string> Entertainment { get; set; } = new();
        public List<string> OnSite { get; set; } = new();

    }
}
