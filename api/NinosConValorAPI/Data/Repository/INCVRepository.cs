using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Data.Repository
{
    public interface INCVRepository
    {
        // HEALTH REPORT
        public Task<HealthReportEntity> CreateHealthReportAsync(HealthReportEntity healthReport);
        Task<HealthReportEntity> GetHealthReportAsync(int kidId);
        Task DeleteHealthReportAsync(int kidId);
        Task<HealthReportEntity> UpdateHealthReportAsync(int kidId, HealthReportEntity healthReport);

        //FIXED ASSET

        Task<bool> SaveChangesAsync();
        public void CreateFixedAsset(FixedAssetEntity fixedAsset);

        public void CreateKid(KidEntity kid);
        Task<KidEntity> GetKidAsync(int kidId);
        Task<IEnumerable<KidEntity>> GetKidsAsync();

        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);

        //PROGRAM HOUSE
        Task<IEnumerable<ProgramHouseEntity>> GetProgramHousesAsync();

    }
}
