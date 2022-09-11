using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IKidService
    {
        KidModel GetKid(int kidId);
        KidModel CreateKid(KidModel kid);
        public IEnumerable<KidModel> GetKids();
    }
}
