using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetCategoryService
    {
        Task<AssetCategoryModel> CreateAssetCategoryAsync(AssetCategoryModel assetCategory);
        Task<IEnumerable<AssetCategoryModel>> GetAssetCategoriesAsync();
        Task<AssetCategoryModel> GetAssetCategoryAsync(int categoryId);
    }
}
