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
        [HttpPost]
        public async Task<ActionResult<BiometricsModel>> CreateBiometricsAsync(int kidId, [FromBody] BiometricsModel biometricsData )
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newBiometricsData = await _biometricsService.CreateBiometricsAsync(kidId,biometricsData);
                return Created($"/api/kids/{kidId}/[controllers]/biometrics", newBiometricsData);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened.");
            }
        }
        [HttpDelete("{biometricsId}")]
        public async Task<ActionResult> DeleteBiometricsAsync(int kidId, int biometricsId)
        {
            try
            {
                await _biometricsService.DeleteBiometricsAsync(kidId, biometricsId);
                return Ok();
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

    }
}
