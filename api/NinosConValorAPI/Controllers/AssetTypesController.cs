using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/assetCategories/{categoryId}/assetTypes")]
    public class AssetTypesController : Controller
    {
        private IAssetTypeService _assetTypeService;

        public AssetTypesController(IAssetTypeService assetTypeService)
        {
            _assetTypeService = assetTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetTypeModel>>> GetAssetTypesAsync(int categoryId)
        {
            try
            {
                var assetTypes = await _assetTypeService.GetAssetTypesAsync(categoryId);
                return Ok(assetTypes);
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
        public async Task<ActionResult<AssetTypeModel>> CreateAssetTypeAsync([FromBody] AssetTypeModel assetType, int categoryId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newAssetType = await _assetTypeService.CreateAssetTypeAsync(assetType, categoryId);
                return Created($"/api/assetCategories/{categoryId}/assetTypes/{newAssetType.Id}", newAssetType);
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


        [HttpGet("{assetTypeId:int}")]
        public async Task<ActionResult<AssetTypeModel>> GetAssetTypeAsync(int assetTypeId)
        {
            try
            {
                var assetType = await _assetTypeService.GetAssetTypeAsync(assetTypeId);
                return Ok(assetType);
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

        [HttpPut("{assetTypeId:int}")]
        public async Task<IActionResult> UpdateAssetTypeAsync(int assetTypeId, [FromBody] AssetTypeModel assetType, int categoryId)
        {
            try
            {
                return Ok(await _assetTypeService.UpdateAssetTypeAsync(assetTypeId, assetType, categoryId));
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

        [HttpDelete("{assetTypeId:int}")]
        public async Task<ActionResult> DeleteAssetTypeAsync(int assetTypeId, int categoryId)
        {
            try
            {
                await _assetTypeService.DeleteAssetTypeAsync(assetTypeId, categoryId);
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
