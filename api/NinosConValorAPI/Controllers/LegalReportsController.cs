using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class LegalReportsController : Controller
    {
        private ILegalReportService _legalReportService;
        public LegalReportsController(ILegalReportService legalReportService)
        {
            _legalReportService = legalReportService;
        }

        [HttpPost]
        public async Task<ActionResult<LegalReportModel>> CreateLegalReportAsync(int kidId, [FromBody] LegalReportModel kid)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newLegalReport = await _legalReportService.CreateLegalReportAsync(kidId, kid);
                return Created($"/api/kids/{newLegalReport.KidId}/[controllers]/{newLegalReport.Id}", newLegalReport);
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

        public async Task<ActionResult<LegalReportModel>> GetLegalReportAsync(int kidId)
        {
            ActionResult<LegalReportModel> response;
            try
            {
                var legalReportModel = await _legalReportService.GetLegalReportAsync(kidId);
                response = Ok(legalReportModel);
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
