using OneToche.API.DTO;
using OneToche.API.Entities;

namespace OneToche.API.Services
{
    public interface ITourService
    {
        Task<List<HotelEntity>> GetAllAsync(TourFilterQueryDTO filter);
        Task<TourUpsertDTO?> GetByIdAsync(int id);

        Task<ServiceResult<TourUpsertDTO>> CreateAsync(TourUpsertDTO dto);
        Task<ServiceResult<TourUpsertDTO>> UpdateAsync(int id, TourUpsertDTO dto);
        Task<bool> DeleteAsync(int id);

        Task<TourDescriptionDTOResponse?> GetDescriptionAsync(int id);
        Task<TourRoomsDTOResponse?> GetRoomsAsync(int id);
        Task<TourInfrastructureDTOResponse?> GetInfrastructureAsync(int id);
    }
}