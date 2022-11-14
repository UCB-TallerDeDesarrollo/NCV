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
        Task DeleteKidAsync(int kidId);

        //FIXED ASSETS
        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId, int categoryId);
        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);
        Task UpdateFixedAssetAsync(int fixedAssetId, FixedAssetEntity fixedAsset);
        Task DeleteFixedAssetAsync(int fixedAssetId);

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

        //ASSET STATES
        Task<AssetStateEntity> CreateAssetState(AssetStateEntity assetState);
        Task<IEnumerable<AssetStateEntity>> GetAssetStatesAsync();
        Task<AssetStateEntity> GetAssetStateAsync(int assetStateId);
        Task<bool> UpdateAssetStateAsync(int assetStateId, AssetStateEntity assetState);
        Task DeleteAssetStateAsync(int assetStateId);

        //TASKS
        Task<bool> SaveChangesAsync();
        // EDUCATION REPORT
        public Task<EducationReportEntity> CreateEducationReportAsync(EducationReportEntity educationReport);

        // LEGAL REPORT
        public Task<LegalReportEntity> CreateLegalReportAsync(LegalReportEntity legalReport);
        Task<LegalReportEntity> GetLegalReportAsync(int kidId);
        Task DeleteLegalReportAsync(int kidId);
        Task<LegalReportEntity> UpdateLegalReportAsync(int kidId, LegalReportEntity legalReport);
    }
}
