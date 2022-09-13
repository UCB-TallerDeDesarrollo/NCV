using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IKidService
    {
        public Task<KidModel> CreateKidAsync(KidModel kid);
        Task<KidModel> GetKidAsync(int kidId);
    }
}

