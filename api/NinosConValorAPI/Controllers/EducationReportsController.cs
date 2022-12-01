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
        [HttpGet()]
        public async Task<ActionResult<EducationReportModel>> GetEducationReportAsync(int kidId)
        {
            ActionResult<EducationReportModel> response;
            try
            {
                var educationReportModel = await _educationReportService.GetEducationReportAsync(kidId);
                response = Ok(educationReportModel);
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
        public async Task<IActionResult> UpdateEducationReportAsync(int kidId, [FromBody] EducationReportModel educationReportModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    foreach (var pair in ModelState)
                    {
                        if (pair.Key == nameof(educationReportModel.Rude) && pair.Value.Errors.Count > 0)
                        {
                            return BadRequest(pair.Value.Errors);
                        }
                    }
                }

                return Ok(await _educationReportService.UpdateEducationReportAsync(kidId, educationReportModel));
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
