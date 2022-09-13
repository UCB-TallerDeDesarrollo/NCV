using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Data.Repository
{
    public interface INCVRepository
    {
        Task<bool> SaveChangesAsync();
        public void CreateFixedAsset(FixedAssetEntity fixedAsset);
        public void CreateKid(KidEntity kid);
    }
}
