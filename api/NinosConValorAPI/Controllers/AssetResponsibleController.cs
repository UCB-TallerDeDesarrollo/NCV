using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/assetResponsibles")]
    public class AssetResponsibleController : Controller
    {
        private IAssetResponsibleService _assetResponsibleService;

        public AssetResponsibleController(IAssetResponsibleService assetResponsibleService)
        {
            _assetResponsibleService = assetResponsibleService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetResponsibleModel>>> GetAssetResponsiblesAsync()
        {
            try
            {
                var assetResponsibles = await _assetResponsibleService.GetAssetResponsiblesAsync();
                return Ok(assetResponsibles);
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

        [HttpPost]
        public async Task<ActionResult<AssetResponsibleModel>> CreateAssetResponsibleAsync([FromBody] AssetResponsibleModel assetResponsible)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newAssetResponsible = await _assetResponsibleService.CreateAssetResponsibleAsync(assetResponsible);
                return Created($"/api/assetResponsibles/{newAssetResponsible.Id}", newAssetResponsible);
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


        [HttpGet("{assetResponsibleId:int}")]
        public async Task<ActionResult<AssetResponsibleModel>> GetAssetResponsableAsync(int assetResponsibleId)
        {
            try
            {
                var assetResponsible = await _assetResponsibleService.GetAssetResponsibleAsync(assetResponsibleId);
                return Ok(assetResponsible);
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

        [HttpPut("{assetResponsibleId:int}")]
        public async Task<IActionResult> UpdateAssetResponsibleAsync(int assetResponsibleId, [FromBody] AssetResponsibleModel assetResponsible)
        {
            try
            {
                return Ok(await _assetResponsibleService.UpdateAssetResponsibleAsync(assetResponsibleId, assetResponsible));
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Lo sentimos, algo sucedió: {ex.Message}");
            }
        }

        [HttpDelete("{assetResponsibleId:int}")]
        public async Task<ActionResult> DeleteAssetResponsibleAsync(int assetResponsibleId)
        {
            try
            {
                await _assetResponsibleService.DeleteAssetResponsibleAsync(assetResponsibleId);
                return Ok();
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidElementOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Lo sentimos, algo sucedió: {ex.Message}");
            }
        }
    }
}

