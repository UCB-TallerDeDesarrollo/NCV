using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IKidService
    {
        public Task<KidModel> CreateKidAsync(KidModel kid);
        Task<KidModel> GetKidAsync(int kidId);
        Task<IEnumerable<KidModel>> GetKidsAsync();
        Task<KidModel> UpdateKidAsync(int kidId, KidModel kidModel);
        Task DeleteKidAsync(int kidId);
    }
}

