using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetStateService
    {
        Task<AssetStateModel> CreateAssetStateAsync(AssetStateModel assetState);
        Task<IEnumerable<AssetStateModel>> GetAssetStatesAsync();
        Task<AssetStateModel> UpdateAssetStateAsync(int StateId, AssetStateModel assetState);
        Task<AssetStateModel> GetAssetStateAsync(int stateID);
        Task DeleteAssetStateAsync(int stateID);

    }
}
