using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IBiometricsService
    {
        Task<BiometricsModel> CreateBiometricsAsync(int kidId, BiometricsModel biometrics);
        Task<IEnumerable<BiometricsModel>> GetBiometricsAsync(int kidId);
        //TO DO: define Delete and Update signature
        Task DeleteBiometricsAsync(int kidId);
        Task<BiometricsModel> UpdateBiometricsAsync(int kidId, BiometricsModel biometrics);
    }
}
