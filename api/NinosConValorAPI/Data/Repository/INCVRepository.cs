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

        // FOUNDATION REPORT
        public Task<FoundationReportEntity> CreateFoundationReportAsync(FoundationReportEntity foundationReport);
        Task<FoundationReportEntity> GetFoundationReportAsync(int kidId);
        Task DeleteFoundationReportAsync(int kidId);
        Task<FoundationReportEntity> UpdateFoundationReportAsync(int kidId, FoundationReportEntity foundationReport);

        //KIDS
        public void CreateKid(KidEntity kid);
        Task<KidEntity> GetKidAsync(int kidId);
        Task<IEnumerable<KidEntity>> GetKidsAsync();
        bool UpdateKid(KidEntity kidModel);
        Task DeleteKidAsync(int kidId);

        //FIXED ASSETS
        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId);
        Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync();
        Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId);
        Task UpdateFixedAssetAsync(int fixedAssetId, FixedAssetEntity fixedAsset);
        Task DeleteFixedAssetAsync(int fixedAssetId);

        // BIOMETRICS
        Task<IEnumerable<BiometricsEntity>> GetBiometricsAsync(int kidId);
        Task<BiometricsEntity> CreateBiometricsAsync(BiometricsEntity biometrics);

        // CONTACTS
        Task<IEnumerable<ContactEntity>> GetContactsAsync(int kidId);
        Task<ContactEntity> CreateContactAsync(ContactEntity contact);

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

        //ASSET TYPES
        Task<AssetTypeEntity> GetAssetTypeAsync(int typeId);
        Task<AssetTypeEntity> CreateAssetType(AssetTypeEntity assetType, int categoryId);
        Task<IEnumerable<AssetTypeEntity>> GetAssetTypesAsync(int categoryId);
        Task<bool> UpdateAssetTypeAsync(int assetTypeId, AssetTypeEntity assetType, int categoryId);
        Task DeleteAssetTypeAsync(int assetTypeId, int categoryId);

        //TASKS
        Task<bool> SaveChangesAsync();

        // EDUCATION REPORT
        public Task<EducationReportEntity> CreateEducationReportAsync(EducationReportEntity educationReport);
        Task<EducationReportEntity> GetEducationReportAsync(int kidId);

        // EDUCATION REPORT
        public Task<FamilyReportEntity> CreateFamilyReportAsync(FamilyReportEntity familyReport);
        Task<FamilyReportEntity> GetFamilyReportAsync(int kidId);

        // LEGAL REPORT
        public Task<LegalReportEntity> CreateLegalReportAsync(LegalReportEntity legalReport);
        Task<LegalReportEntity> GetLegalReportAsync(int kidId);
        Task DeleteLegalReportAsync(int kidId);
        Task<LegalReportEntity> UpdateLegalReportAsync(int kidId, LegalReportEntity legalReport);
    }
}
