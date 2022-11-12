using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IAssetStateService
    {
        Task<AssetStateModel> CreateAssetStateAsync(AssetStateModel assetState);
        Task<IEnumerable<AssetStateModel>> GetAssetStatesAsync();
        Task<AssetStateModel> UpdateStateAsync(int StateId, AssetStateModel assetState);
        Task<AssetStateModel> GetStateAsync(int stateID);

    }
}
