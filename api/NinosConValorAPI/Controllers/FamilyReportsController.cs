using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class FamilyReportsController : Controller
    {
        private IFamilyReportService _familyReportService;
        public FamilyReportsController(IFamilyReportService familyReportService)
        {
            _familyReportService = familyReportService;
        }

        [HttpPost]
        public async Task<ActionResult<FamilyReportModel>> CreateFamilyReportAsync(int kidId, [FromBody] FamilyReportModel familyReportModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newFamilyReport = await _familyReportService.CreateFamilyReportAsync(kidId, familyReportModel);
                return Created($"/api/kids/{kidId}/[controllers]/familyreports", newFamilyReport);
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
        [HttpGet]
        public async Task<ActionResult<FamilyReportModel>> GetFamilyReportAsync(int kidId)
        {
            ActionResult<FamilyReportModel> response;
            try
            {
                var familyReportModel = await _familyReportService.GetFamilyReportAsync(kidId);
                response = Ok(familyReportModel);
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
