using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Data.Repository
{
    public interface INCVRepository
    {
        // HEALTH REPORT
        public Task<HealthReportEntity> CreateHealthReportAsync(HealthReportEntity healthReport);
        Task<HealthReportEntity> GetHealthReportAsync(int kidId);
        Task DeleteHealthReportAsync(int kidId);
        Task<HealthReportEntity> UpdateHealthReportAsync(int kidId, HealthReportEntity healthReport);

        // BIOMETRICS
        Task<IEnumerable<BiometricsEntity>> GetBiometricsAsync(int kidId);


        //FIXED ASSET

        Task<bool> SaveChangesAsync();
        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId);
        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);

        //KID FILE
        public void CreateKid(KidEntity kid);
        Task<KidEntity> GetKidAsync(int kidId);
        Task<IEnumerable<KidEntity>> GetKidsAsync();
        bool UpdateKid(KidEntity kidModel);

        //PROGRAM HOUSE
        Task<IEnumerable<ProgramHouseEntity>> GetProgramHousesAsync();
        Task<ProgramHouseEntity> GetProgramHouseAsync(int programHouseId);

    }
}
