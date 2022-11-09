using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class EducationReportsController : Controller
    {
        private IEducationReportService _educationReportService;
        public EducationReportsController(IEducationReportService educationReportService)
        {
            _educationReportService = educationReportService;
        }

        [HttpPost]
        public async Task<ActionResult<EducationReportModel>> CreateEducationReportAsync(int kidId, [FromBody] EducationReportModel kid)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newEducationReport = await _educationReportService.CreateEducationReportAsync(kidId, kid);
                return Created($"/api/kids/{newEducationReport.KidId}/[controllers]/{newEducationReport.Id}", newEducationReport);
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
    }
}
