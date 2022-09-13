using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System.Security.Cryptography;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids")]
    public class KidsController : ControllerBase
    {
        private IKidService _kidService;

        public KidsController(IKidService kidService)
        {
            _kidService = kidService;
        }

        [HttpPost]
        public async Task<ActionResult<KidModel>> CreateKidAsync([FromBody] KidModel kid)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newKid = await _kidService.CreateKidAsync(kid);
                return Created($"/api/kids/{newKid.Id}", newKid);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened.");
            }
        }
        [HttpGet("{kidId:int}")]
        public async Task<ActionResult<KidModel>> GetKidAync(int kidId)
        {
            try
            {
                return await _kidService.GetKidAsync(kidId);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KidModel>>> GetKidsAync()
        {   
            try
            {
                return Ok (await _kidService.GetKidsAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
    }

}
