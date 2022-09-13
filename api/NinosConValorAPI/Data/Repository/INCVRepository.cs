using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Data.Repository
{
    public interface INCVRepository
    {
        Task<bool> SaveChangesAsync();
        public void CreateFixedAsset(FixedAssetEntity fixedAsset);
        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);
    }
}
