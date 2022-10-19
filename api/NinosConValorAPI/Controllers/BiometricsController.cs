using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class BiometricsController : Controller
    {
        private IBiometricsService _biometricsService;
        public BiometricsController(IBiometricsService biometricsService)
        {
            _biometricsService = biometricsService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BiometricsModel>>> GetBiometricsAsync(int kidId)
        {
            ActionResult<IEnumerable<BiometricsModel>> response;
            try
            {
                var biometricsModel = await _biometricsService.GetBiometricsAsync(kidId);
                response = Ok(biometricsModel);
            }
            catch (NotFoundElementException ex)
            {
                response = NotFound(ex.Message);
            }
            catch (Exception)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, "General exception: Something happened");
            }
            return response;
        }
    }
}
