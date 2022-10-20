using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IFixedAssetService
    {
        public Task<FixedAssetModel> CreateFixedAssetAsync(FixedAssetModel fixedAsset, int programHouseId, int categoryId);
        Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync(int categoryId);
        Task<FixedAssetModel> GetFixedAssetAsync(int fixedAssetId, int categoryId);
    }
}
