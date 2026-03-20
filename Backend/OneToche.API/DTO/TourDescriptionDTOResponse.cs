namespace OneToche.API.DTO
{
    public class TourDescriptionDTOResponse
    {
        public List<string> Photos { get; set; } = new();
        public string Location { get; set; } = string.Empty;
        public string Beach { get; set; } = string.Empty;
        public string MainInfo { get; set; } = string.Empty;
        public string Contacts { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}
