using Microsoft.AspNetCore.Mvc;
using OneToche.API.DTO;
using OneToche.API.Entities;
using OneToche.API.Services;

namespace OneToche.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourController : ControllerBase
    {
        private readonly ITourService _tourService;

        public TourController(ITourService tourService)
        {
            _tourService = tourService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelEntity>>> GetAllTours([FromQuery] TourFilterQueryDTO filter)
        {
            var tours = await _tourService.GetAllAsync(filter);
            return Ok(tours);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourUpsertDTO>> GetTourById(int id)
        {
            var tour = await _tourService.GetByIdAsync(id);

            if (tour == null)
                return NotFound(new { message = "Тур не найден" });

            return Ok(tour);
        }

        [HttpPost]
        public async Task<ActionResult<TourUpsertDTO>> CreateTour([FromBody] TourUpsertDTO dto)
        {
            var result = await _tourService.CreateAsync(dto);

            if (!result.Success)
                return BadRequest(new { message = result.Error });

            return CreatedAtAction(nameof(GetTourById), new { id = result.Data!.Id }, result.Data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TourUpsertDTO>> UpdateTour(int id, [FromBody] TourUpsertDTO dto)
        {
            var result = await _tourService.UpdateAsync(id, dto);

            if (!result.Success)
            {
                if (result.Error == "Тур не найден")
                    return NotFound(new { message = result.Error });

                return BadRequest(new { message = result.Error });
            }

            return Ok(result.Data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTour(int id)
        {
            var deleted = await _tourService.DeleteAsync(id);

            if (!deleted)
                return NotFound(new { message = "Тур не найден" });

            return NoContent();
        }

        [HttpGet("{id}/description")]
        public async Task<ActionResult<TourDescriptionDTOResponse>> GetDescriptionTab(int id)
        {
            var result = await _tourService.GetDescriptionAsync(id);

            if (result == null)
                return NotFound(new { message = "Тур не найден" });

            return Ok(result);
        }

        [HttpGet("{id}/rooms")]
        public async Task<ActionResult<TourRoomsDTOResponse>> GetRoomsTab(int id)
        {
            var result = await _tourService.GetRoomsAsync(id);

            if (result == null)
                return NotFound(new { message = "Тур не найден" });

            return Ok(result);
        }

        [HttpGet("{id}/infrastructure")]
        public async Task<ActionResult<TourInfrastructureDTOResponse>> GetInfrastructureTab(int id)
        {
            var result = await _tourService.GetInfrastructureAsync(id);

            if (result == null)
                return NotFound(new { message = "Тур не найден" });

            return Ok(result);
        }
    }
}