using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetResponsibleService
    {
        Task<AssetResponsibleModel> CreateAssetResponsibleAsync(AssetResponsibleModel assetResponsible);
        Task<IEnumerable<AssetResponsibleModel>> GetAssetResponsiblesAsync();
        Task<AssetResponsibleModel> UpdateAssetResponsibleAsync(int ResponsibleId, AssetResponsibleModel assetResponsible);
        Task<AssetResponsibleModel> GetAssetResponsibleAsync(int ResponsibleId);
        Task DeleteAssetResponsibleAsync(int ResponsibleId);

    }
}