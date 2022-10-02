using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class HealthReportsController : Controller
    {
        IHealthReportService _healthReportService;
        public HealthReportsController(IHealthReportService healthReportService)
        {
            _healthReportService = healthReportService;
        }
        
        [HttpPost]
        public async Task<ActionResult<HealthReportModel>> CreateHealthReportAsync(int kidId,[FromBody] HealthReportModel kid)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newHealthReport = await _healthReportService.CreateHealthReportAsync(kidId,kid);
                return Created($"/api/kids/{newHealthReport.KidId}/[controllers]/{newHealthReport.Id}", newHealthReport);
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

        public async Task<ActionResult<HealthReportModel>> GetHealthReportAsync(int kidId)
        {
            ActionResult<HealthReportModel> response;
            try
            {
                var healthReportModel = await _healthReportService.GetHealthReportAsync(kidId);
                response = Ok(healthReportModel);
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
