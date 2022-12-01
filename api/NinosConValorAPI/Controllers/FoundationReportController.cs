using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class FoundationReportController : Controller
    {
        private IFoundationReportService _foundationReportService;
        public FoundationReportController(IFoundationReportService foundationReportService)
        {
            _foundationReportService = foundationReportService;
        }
        
        [HttpPost]
        public async Task<ActionResult<FoundationReportModel>> CreateFoundationReportAsync(int kidId,[FromBody] FoundationReportModel foundationReportModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newFoundationReport = await _foundationReportService.CreateFoundationReportAsync(kidId, foundationReportModel);
                return Created($"/api/kids/{newFoundationReport.KidId}/[controllers]/{newFoundationReport.Id}", newFoundationReport);
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

        public async Task<ActionResult<FoundationReportModel>> GetFoundationReportAsync(int kidId)
        {
            ActionResult<FoundationReportModel> response;
            try
            {
                var foundationReportModel = await _foundationReportService.GetFoundationReportAsync(kidId);
                response = Ok(foundationReportModel);
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
        [HttpPut]
        public async Task<IActionResult> UpdateFoundationReportAsync(int kidId, [FromBody] FoundationReportModel foundationReportModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(await _foundationReportService.UpdateFoundationReportAsync(kidId, foundationReportModel));
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message); ;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
    }
}
