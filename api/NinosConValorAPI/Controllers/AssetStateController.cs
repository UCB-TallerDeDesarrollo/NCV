using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/assetStates")]
    public class AssetStateController : Controller
    {
        private IAssetStateService _assetStateService;

        public AssetStateController(IAssetStateService assetStateService)
        {
            _assetStateService = assetStateService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetStateModel>>> GetAssetStatesAsync()
        {
            try
            {                
                var assetStates = await _assetStateService.GetAssetStatesAsync();
                return Ok(assetStates);
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
        public async Task<ActionResult<AssetStateModel>> CreateAssetStateAsync([FromBody] AssetStateModel assetState)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                var newAssetState = await _assetStateService.CreateAssetStateAsync(assetState);
                return Created($"/api/assetStates/{newAssetState.Id}", newAssetState);
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


        [HttpGet("{assetStateId:int}")]
        public async Task<ActionResult<AssetStateModel>> GetAssetStateAsync(int assetStateId)
        {
            try
            {
                var assetState = await _assetStateService.GetAssetStateAsync(assetStateId);
                return Ok(assetState);
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

        [HttpPut("{assetStateId:int}")]
        public async Task<IActionResult> UpdateAssetStateAsync(int assetStateId, [FromBody] AssetStateModel assetState)
        {
            try
            {
                return Ok(await _assetStateService.UpdateAssetStateAsync(assetStateId, assetState));
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

        [HttpDelete("{assetStateId:int}")]
        public async Task<ActionResult> DeleteAssetStateAsync(int assetStateId)
        {
            try
            {
                await _assetStateService.DeleteAssetStateAsync(assetStateId);
                return Ok();
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch(InvalidElementOperationException ex)
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
