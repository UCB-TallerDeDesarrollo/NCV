using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/assetCategories")]
    public class AssetCategoriesController : Controller
    {
        private IAssetCategoryService _assetCategoriesService;

        public AssetCategoriesController(IAssetCategoryService assetCategoriesService)
        {
            _assetCategoriesService = assetCategoriesService;
        }
    
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetCategoryModel>>> GetAssetCategoriesAsync(string showAssets)
        {
            try
            {   
                bool showAssetsBoolean;
                if (!Boolean.TryParse(showAssets, out showAssetsBoolean))
                {
                    showAssetsBoolean = false;
                }

                var assetCategories = await _assetCategoriesService.GetAssetCategoriesAsync(showAssetsBoolean);
                return Ok(assetCategories);
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

        [HttpGet("{assetCategoriesId:int}")]
        public async Task<ActionResult<AssetCategoryModel>> GetAssetCategoryAsync(int categoryId)
        {
            try
            {
                var assetCategory= await _assetCategoriesService.GetAssetCategoryAsync(categoryId);
                return Ok(assetCategory);
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
        public async Task<ActionResult<AssetCategoryModel>> CreateAssetCategoryAsync([FromBody] AssetCategoryModel assetCategory)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                Console.Write(assetCategory);
                var newAssetCategory = await _assetCategoriesService.CreateAssetCategoryAsync(assetCategory);
                Console.Write(newAssetCategory.Id);
                return Created($"/api/assetCategories/{newAssetCategory.Id}", newAssetCategory);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lo sentimos, algo sucedió");                                
            }
        }
        // [HttpPut("{assetCategoriesId:int}")]
        // public async Task<IActionResult> UpdateAssetCategoryAsync(int assetCategoryId, [FromBody] AssetCategoryModel assetCategory)
        // {
        //     try
        //     {
        //         return Ok(await _assetCategoriesService.UpdateAssetCategoryAsync(assetCategoryId, assetCategory));
        //     }
        //     catch (NotFoundElementException ex)
        //     {
        //         return NotFound(ex.Message);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"Lo sentimos, algo sucedió: {ex.Message}");
        //     }
        // }

        // [HttpDelete("{assetCategoriesId:int}")]
        // public async Task<ActionResult> DeleteAssetCategoriesAsync(int assetCategoryId)
        // {
        //     try
        //     {
        //         await _assetCategoriesService.DeleteAssetCategoriesAsync(assetCategoryId);
        //         return Ok();
        //     }
        //     catch (NotFoundElementException ex)
        //     {
        //         return NotFound(ex.Message);
        //     }
        //     catch(InvalidElementOperationException ex)
        //     {
        //         return BadRequest(ex.Message);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"Lo sentimos, algo sucedió: {ex.Message}");
        //     }
        // }
    }
}
