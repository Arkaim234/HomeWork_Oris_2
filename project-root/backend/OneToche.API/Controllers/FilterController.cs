using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneToche.API.data;

namespace OneToche.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FilterController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilters()
        {
            return Ok(new
            {
                countries = await _context.Countries
                    .Select(x => new { x.Id, x.Name })
                    .ToListAsync(),

                cities = await _context.Cities
                    .Select(x => new { x.Id, x.Name, x.CountryId })
                    .ToListAsync(),

                categories = await _context.HotelCategories
                    .Select(x => new { x.Id, x.Name })
                    .ToListAsync(),

                mealPlans = await _context.MealPlans
                    .Select(x => new { x.Id, x.Code, x.Description, x.SmokingAllowedInRestaurant })
                    .ToListAsync()
            });
        }
    }
}