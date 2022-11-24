using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetTypeService
    {
        Task<AssetTypeModel> CreateAssetTypeAsync(AssetTypeModel assetType, int categoryId);
        Task<IEnumerable<AssetTypeModel>> GetAssetTypesAsync(int categoryId);
        Task<AssetTypeModel> UpdateAssetTypeAsync(int typeId, AssetTypeModel assetType, int categoryId);
        Task<AssetTypeModel> GetAssetTypeAsync(int typeId);
        Task DeleteAssetTypeAsync(int typeId, int categoryId);
    }
}
