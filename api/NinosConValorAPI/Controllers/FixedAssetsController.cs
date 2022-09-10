using Microsoft.AspNetCore.Mvc;
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
                var newFixedAsset = await _fixedAssetService.CreateFixedAssetAsync(fixedAsset);
                return Created($"/api/fixedAssets/{newFixedAsset.Id}", newFixedAsset);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened.");
            }
        }
    }
}
