using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetCategoryService
    {
        Task<AssetCategoryModel> CreateAssetCategoryAsync(AssetCategoryModel assetCategory);
        Task<IEnumerable<AssetCategoryModel>> GetAssetCategoriesAsync(bool showAssets = false);
        Task<AssetCategoryModel> GetAssetCategoryAsync(int categoryId);
        Task<AssetCategoryModel> UpdateAssetCategoryAsync(int categoryId, AssetCategoryModel assetCategory);        
        Task DeleteAssetCategoriesAsync(int categoryId);
    }
}
