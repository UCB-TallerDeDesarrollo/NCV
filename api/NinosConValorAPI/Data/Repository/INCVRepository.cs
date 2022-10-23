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

        //KIDS
        public void CreateKid(KidEntity kid);
        Task<KidEntity> GetKidAsync(int kidId);
        Task<IEnumerable<KidEntity>> GetKidsAsync();
        bool UpdateKid(KidEntity kidModel);

        //FIXED ASSETS
        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId, int categoryId);
        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);
      
        // BIOMETRICS
        Task<IEnumerable<BiometricsEntity>> GetBiometricsAsync(int kidId);
        Task<BiometricsEntity> CreateBiometricsAsync(BiometricsEntity biometrics);

        //PROGRAM HOUSE
        Task<IEnumerable<ProgramHouseEntity>> GetProgramHousesAsync();
        Task<ProgramHouseEntity> GetProgramHouseAsync(int programHouseId);

        //ASSETS CATEGORIES
        void CreateAssetCategory(AssetCategoryEntity assetCategory);
        Task<IEnumerable<AssetCategoryEntity>> GetAssetCategoriesAsync(bool showAssets = false);
        Task<AssetCategoryEntity> GetAssetCategoryAsync(int categoryId);

        //TASKS
        Task<bool> SaveChangesAsync();
    }
}
