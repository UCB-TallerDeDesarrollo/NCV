
﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Data.Repository
{
    public class NCVRepository:INCVRepository
    {
        private NCV_DBContext _dbContext;
        
        public NCVRepository(NCV_DBContext NCV_DBContext)
        {
            _dbContext = NCV_DBContext;
        }

        // HEALTH REPORT

        public async Task<HealthReportEntity> CreateHealthReportAsync(HealthReportEntity healthReport)
        {
            await _dbContext.HealthReports.AddAsync(healthReport);
            return healthReport;
        }
        public async Task<HealthReportEntity> GetHealthReportAsync(int kidId)
        {
            IQueryable<HealthReportEntity> query = _dbContext.HealthReports;
            query = query.AsNoTracking();
            var healthReport = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            return healthReport;
        }
        public Task DeleteHealthReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public async Task<HealthReportEntity> UpdateHealthReportAsync(int kidId, HealthReportEntity healthReport)
        {
            IQueryable<HealthReportEntity> query = _dbContext.HealthReports;
            var healthReportToUpdate = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            //_dbContext.Entry(healthReportToUpdate).CurrentValues.SetValues(healthReport);
            healthReportToUpdate.BloodType = healthReport.BloodType ?? healthReportToUpdate.BloodType;
            healthReportToUpdate.NeurologicalDiagnosis = healthReport.NeurologicalDiagnosis ?? healthReportToUpdate.NeurologicalDiagnosis;
            healthReportToUpdate.PsychologicalDiagnosis = healthReport.PsychologicalDiagnosis ?? healthReportToUpdate.PsychologicalDiagnosis;
            healthReportToUpdate.SpecialDiagnosis = healthReport.SpecialDiagnosis ?? healthReportToUpdate.SpecialDiagnosis;
            healthReportToUpdate.HealthProblems = healthReport.HealthProblems ?? healthReportToUpdate.HealthProblems;
            healthReportToUpdate.CIDiscapacidad = healthReport.CIDiscapacidad ?? healthReportToUpdate.CIDiscapacidad;
            return healthReportToUpdate;
        }

        // LEGAL REPORT

        public async Task<LegalReportEntity> CreateLegalReportAsync(LegalReportEntity legalReport)
        {
            await _dbContext.LegalReports.AddAsync(legalReport);
            return legalReport;
        }
        public async Task<LegalReportEntity> GetLegalReportAsync(int kidId)
        {
            IQueryable<LegalReportEntity> query = _dbContext.LegalReports;
            query = query.AsNoTracking();
            var legalReport = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            return legalReport;
        }
        public Task DeleteLegalReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public async Task<LegalReportEntity> UpdateLegalReportAsync(int kidId, LegalReportEntity legalReport)
        {
            throw new NotImplementedException();
        }

        // FOUNDATION REPORT

        public async Task<FoundationReportEntity> CreateFoundationReportAsync(FoundationReportEntity foundationReport)
        {
            await _dbContext.FoundationReport.AddAsync(foundationReport);
            return foundationReport;
        }

        // BIOMETRICS

        public async Task<IEnumerable<BiometricsEntity>> GetBiometricsAsync(int kidId)
        {
            IQueryable<BiometricsEntity> query = _dbContext.Biometrics;
            query = query.AsNoTracking();
            query = query.Where(b => b.KidId == kidId);
            query = query.OrderBy(b => b.RegisterDate);
            return await query.ToListAsync();
        }
        public async Task<BiometricsEntity> CreateBiometricsAsync(BiometricsEntity biometrics)
        {
            //_dbContext.Entry(biometrics.Kid).State = EntityState.Unchanged;
            await _dbContext.Biometrics.AddAsync(biometrics);
            //_dbContext.Entry(biometrics.Kid).State = EntityState.Detached;
            return biometrics;
        }

        // CONTACTS

        public async Task<IEnumerable<ContactEntity>> GetContactsAsync(int kidId)
        {
            IQueryable<ContactEntity> query = _dbContext.Contacts;
            query = query.AsNoTracking();
            query = query.Where(b => b.KidId == kidId);
            query = query.OrderBy(b => b.Name); 
            return await query.ToListAsync();
        }
        public async Task<ContactEntity> CreateContactAsync(ContactEntity contacts)
        {
            await _dbContext.Contacts.AddAsync(contacts);
            return contacts;
        }

        // EDUCATION REPORT
        public async Task<EducationReportEntity> CreateEducationReportAsync(EducationReportEntity educationReport)
        {
            await _dbContext.EducationReports.AddAsync(educationReport);
            return educationReport;
        }

        public async Task<EducationReportEntity> GetEducationReportAsync(int kidId)
        {
            IQueryable<EducationReportEntity> query = _dbContext.EducationReports;
            query = query.AsNoTracking();
            var educationReport = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            return educationReport;
        }

        // FAMILY REPORT
        public async Task<FamilyReportEntity> CreateFamilyReportAsync(FamilyReportEntity familyReportEntity)
        {
            await _dbContext.FamilyReports.AddAsync(familyReportEntity);
            return familyReportEntity;
        }

        public async Task<FamilyReportEntity> GetFamilyReportAsync(int kidId)
        {
            IQueryable<FamilyReportEntity> query = _dbContext.FamilyReports;
            query = query.AsNoTracking();
            var familyReportEntity = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            return familyReportEntity;
        }

        // FIXED ASSET

        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId, int typeId)
        {
            _dbContext.Entry(fixedAsset.AssetType).State = EntityState.Unchanged;
            _dbContext.Entry(fixedAsset.ProgramHouse).State = EntityState.Unchanged;
            _dbContext.Entry(fixedAsset.AssetState).State = EntityState.Unchanged;
            _dbContext.FixedAssets.Add(fixedAsset);
        }
        public async Task<KidEntity> GetKidAsync(int kidId)
        {
            IQueryable<KidEntity> query = _dbContext.Kids;
            query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(c => c.Id == kidId);
        }
        public async Task<IEnumerable<KidEntity>> GetKidsAsync()
        {
            IQueryable<KidEntity> query = _dbContext.Kids;
            query = query.AsNoTracking();
            query = query.OrderBy(k => k.FirstName).ThenBy(k => k.LastName);
            return await query.ToListAsync() ;
        }
        public void CreateKid(KidEntity kid)
        {
            _dbContext.Kids.Add(kid);
        }

        public async Task DeleteKidAsync(int kidId)
        {
            var kidToDelete = await _dbContext.Kids.FirstOrDefaultAsync(c => c.Id == kidId);
            _dbContext.Kids.Remove(kidToDelete);
        }

        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                var result = await _dbContext.SaveChangesAsync();
                return result > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync()
        {
            IQueryable<FixedAssetEntity> query = _dbContext.FixedAssets;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetType);
            query = query.Include(f => f.AssetType.AssetCategory);
            query = query.Include(f => f.ProgramHouse);
            query = query.Include(f => f.AssetState);
            query = query.Where(f => f.Deleted == false);
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId)
        {
            IQueryable<FixedAssetEntity> query = _dbContext.FixedAssets;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetType);
            query = query.Include(f => f.AssetType.AssetCategory);
            query = query.Include(f=>f.ProgramHouse);
            query = query.Include(f => f.AssetState);
            var fixedAssetEntity = await query.FirstOrDefaultAsync(g => g.Id == fixedAssetId);
            return fixedAssetEntity;
        }

        public async Task UpdateFixedAssetAsync(int fixedAssetId, FixedAssetEntity fixedAsset)
        {
            var fixedAssetToUpdate = await _dbContext.FixedAssets.FirstOrDefaultAsync(f => f.Id == fixedAssetId);
            fixedAssetToUpdate.Code = fixedAsset.Code ?? fixedAssetToUpdate.Code;
            fixedAssetToUpdate.Name = fixedAsset.Name ?? fixedAssetToUpdate.Name;
            fixedAssetToUpdate.Description = fixedAsset.Description ?? fixedAssetToUpdate.Description;
            fixedAssetToUpdate.EntryDate = fixedAsset.EntryDate ?? fixedAssetToUpdate.EntryDate;
            fixedAssetToUpdate.Price = fixedAsset.Price ?? fixedAssetToUpdate.Price;
            fixedAssetToUpdate.Features = fixedAsset.Features ?? fixedAssetToUpdate.Features;
            fixedAssetToUpdate.ProgramHouse = fixedAsset.ProgramHouse ?? fixedAssetToUpdate.ProgramHouse;
            fixedAssetToUpdate.AssetType = fixedAsset.AssetType ?? fixedAssetToUpdate.AssetType;
            fixedAssetToUpdate.AssetState = fixedAsset.AssetState ?? fixedAssetToUpdate.AssetState;            
        }
        public async Task<FoundationReportEntity> GetFoundationReportAsync(int kidId)
        {
            IQueryable<FoundationReportEntity> query = _dbContext.FoundationReport;
            query = query.AsNoTracking();
            var foundationReport = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            return foundationReport;
        }

        public Task DeleteFoundationReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public Task<FoundationReportEntity> UpdateFoundationReportAsync(int kidId, FoundationReportEntity foundationReport)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ProgramHouseEntity>> GetProgramHousesAsync()
        {
            IQueryable<ProgramHouseEntity> query = _dbContext.ProgramHouses;
            query = query.AsNoTracking();
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<ProgramHouseEntity> GetProgramHouseAsync(int programHouseId)
        {
            IQueryable<ProgramHouseEntity> query = _dbContext.ProgramHouses;
            query = query.AsNoTracking();
            var programHouse = await query.FirstOrDefaultAsync(rep => (rep.Id == programHouseId));
            return programHouse;
        }

        public async Task<IEnumerable<AssetCategoryEntity>> GetAssetCategoriesAsync(bool showAssets = false)
        {
            IQueryable<AssetCategoryEntity> query = _dbContext.AssetCategories;
            query = query.AsNoTracking();
            if (showAssets)
            {
                query = query.Include(f => f.AssetTypes);
            }
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<AssetCategoryEntity> GetAssetCategoryAsync(int categoryId)
        {
            IQueryable<AssetCategoryEntity> query = _dbContext.AssetCategories;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetTypes);
            var assetCategory = await query.FirstOrDefaultAsync(g => (g.Id == categoryId));
            return assetCategory;
        }

        public void CreateAssetCategory(AssetCategoryEntity assetCategory)
        {
            _dbContext.AssetCategories.Add(assetCategory);
        }

        public async Task<AssetTypeEntity> GetAssetTypeAsync(int typeId)
        {
            IQueryable<AssetTypeEntity> query = _dbContext.AssetTypes;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetCategory);
            var assetType = await query.FirstOrDefaultAsync(g => (g.Id == typeId));
            return assetType;
        }

        public bool UpdateKid(KidEntity kidModel)
        {
            var kidToUpdate = _dbContext.Kids.FirstOrDefault(c => c.Id == kidModel.Id);

            _dbContext.Entry(kidToUpdate).CurrentValues.SetValues(kidModel);
            return true;
        }
        
        public async Task DeleteFixedAssetAsync(int fixedAssetId)
        {
            IQueryable<FixedAssetEntity> query = _dbContext.FixedAssets;
            var fixedAssetToDelete = await query.FirstOrDefaultAsync(g => (g.Id == fixedAssetId) & (g.Deleted == false));
            fixedAssetToDelete.Deleted = true;
        }

        public async Task<AssetStateEntity> CreateAssetState(AssetStateEntity assetState)
        {
            await _dbContext.AssetStates.AddAsync(assetState);
            return assetState;
        }

        public async Task<IEnumerable<AssetStateEntity>> GetAssetStatesAsync()
        {
            IQueryable<AssetStateEntity> query = _dbContext.AssetStates;
            query = query.AsNoTracking();
            query = query.Where(f => f.Deleted == false);
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<AssetStateEntity> GetAssetStateAsync(int assetStateId)
        {
            IQueryable<AssetStateEntity> query = _dbContext.AssetStates;
            query = query.AsNoTracking();
            var assetState = await query.FirstOrDefaultAsync(g => (g.Id == assetStateId));
            return assetState;
        }

        public async Task<bool> UpdateAssetStateAsync(int assetStateId, AssetStateEntity assetState)
        {
            var assetStateToUpdate = _dbContext.AssetStates.FirstOrDefault(c => c.Id == assetState.Id);

            _dbContext.Entry(assetStateToUpdate).CurrentValues.SetValues(assetState);
            return true;
        }

        public async Task DeleteAssetStateAsync(int assetStateId)
        {
            IQueryable<AssetStateEntity> query = _dbContext.AssetStates;
            var assetStateToDelete = await query.FirstOrDefaultAsync(g => (g.Id == assetStateId) & (g.Deleted == false));
            assetStateToDelete.Deleted = true;
        }

        //ASSET TYPES
        public async Task<AssetTypeEntity> CreateAssetType(AssetTypeEntity assetType, int categoryId)
        {
            _dbContext.Entry(assetType.AssetCategory).State = EntityState.Unchanged;
            await _dbContext.AssetTypes.AddAsync(assetType);
            return assetType;
        }

        public async Task<IEnumerable<AssetTypeEntity>> GetAssetTypesAsync(int categoryId)
        {
            IQueryable<AssetTypeEntity> query = _dbContext.AssetTypes;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetCategory);
            query = query.Where(f => f.Deleted == false && f.AssetCategory.Id == categoryId);
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<bool> UpdateAssetTypeAsync(int assetTypeId, AssetTypeEntity assetType, int categoryId)
        {
            var assetTypeToUpdate = _dbContext.AssetTypes.FirstOrDefault(c => c.Id == assetType.Id && c.AssetCategory.Id == categoryId);

            _dbContext.Entry(assetTypeToUpdate).CurrentValues.SetValues(assetType);
            return true;
        }

        public async Task DeleteAssetTypeAsync(int assetTypeId, int categoryId)
        {
            IQueryable<AssetTypeEntity> query = _dbContext.AssetTypes;
            var assetTypeToDelete = await query.FirstOrDefaultAsync(g => (g.Id == assetTypeId) & (g.Deleted == false) & (g.AssetCategory.Id==categoryId));
            assetTypeToDelete.Deleted = true;
        }
    }
}
