using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IFixedAssetService
    {
        public Task<FixedAssetModel> CreateFixedAssetAsync(FixedAssetModel child);
        Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync();
    }
}
