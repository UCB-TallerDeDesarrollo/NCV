using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Data.Repository
{
    public interface IKidRepository
    {
        KidEntity GetKid(int kidId);
        KidEntity CreateKid(KidEntity kid);
        IEnumerable<KidEntity> GetKids();
    }
}
