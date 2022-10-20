using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/programHouses")]
    public class ProgramHousesController : Controller
    {
        private IProgramHouseService _programHouseService;

        public ProgramHousesController(IProgramHouseService programHouseService)
        {
            _programHouseService = programHouseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgramHouseModel>>> GetProgramHousesAsync()
        {
            try
            {
                var programHouses = await _programHouseService.GetProgramHousesAsync();
                return Ok(programHouses);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lo sentimos, algo sucedió.");
            }
        }

        [HttpGet("{programHouseId:int}")]
        public async Task<ActionResult< ProgramHouseModel >> GetProgramHouseAsync(int programHouseId)
        {
            try
            {
                var programHouse = await _programHouseService.GetProgramHouseAsync(programHouseId);
                return Ok(programHouse);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lo sentimos, algo sucedió.");
            }
        }
    }
}
