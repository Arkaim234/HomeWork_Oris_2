using Microsoft.AspNetCore.Mvc;
using OneToche.API.data;
using MiniHttpServer.Model;

namespace OneToche.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetFilters()
        {
            return Ok(new
            {
                countries = DataSeed.Countries,
                cities = DataSeed.Cities,
                categories = DataSeed.Categories,
                mealPlans = DataSeed.MealPlans
            });
        }

    }
}