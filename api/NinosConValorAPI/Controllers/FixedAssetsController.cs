using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/fixedAssets")]

    public class FixedAssetsController : Controller
    {
        private IFixedAssetService _fixedAssetService;

        public FixedAssetsController(IFixedAssetService fixedAssetService)
        {
            _fixedAssetService = fixedAssetService;
        }

        [HttpPost]
        public async Task<ActionResult<FixedAssetModel>> CreateFixedAssetAsync([FromBody] FixedAssetModel fixedAsset)
        {
            try
            {                               
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                int programHouseId = fixedAsset.ProgramHouseId;
                int categoryId = fixedAsset.AssetCategoryId; 
                var newFixedAsset = await _fixedAssetService.CreateFixedAssetAsync(fixedAsset, programHouseId, categoryId);
                return Created($"/api/fixedAssets/{newFixedAsset.Id}", newFixedAsset);
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FixedAssetModel>>> GetFixedAssetsAsync()
        {
            try
            {
                var fixedAssets = await _fixedAssetService.GetFixedAssetsAsync();
                return Ok(fixedAssets);
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

        [HttpGet("{fixedAssetId:int}")]
        public async Task<ActionResult<FixedAssetModel>> GetFixedAssetAsync(int fixedAssetId)
        {
            try
            {
                var fixedAsset = await _fixedAssetService.GetFixedAssetAsync(fixedAssetId);
                return Ok(fixedAsset);
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

        [HttpPut("{fixedAssetId:int}")]
        public async Task<IActionResult> UpdateFixedAssetAsync(int fixedAssetId, [FromBody] FixedAssetModel fixedAsset)
        {
            try
            {
                return Ok(await _fixedAssetService.UpdateFixedAssetAsync(fixedAssetId, fixedAsset));
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

        [HttpDelete("{fixedAssetId:int}")]
        public async Task<ActionResult> DeleteRestaurantAsync(int fixedAssetId)
        {
            try
            {
                await _fixedAssetService.DeleteFixedAssetAsync(fixedAssetId);
                return Ok();
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
    }
}
