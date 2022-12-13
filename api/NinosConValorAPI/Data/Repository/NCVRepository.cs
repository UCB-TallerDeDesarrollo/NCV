
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
            IQueryable<LegalReportEntity> query = _dbContext.LegalReports;
            var legalReportToUpdate = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            legalReportToUpdate.CourtNumber = legalReport.CourtNumber ?? legalReportToUpdate.CourtNumber;
            legalReportToUpdate.Dna = legalReport.Dna ?? legalReportToUpdate.Dna;
            legalReportToUpdate.Nurej = legalReport.Nurej ?? legalReportToUpdate.Nurej;
            legalReportToUpdate.LegalProcesses = legalReport.LegalProcesses ?? legalReportToUpdate.LegalProcesses;
            return legalReportToUpdate;
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
        public async Task DeleteBiometricsAsync(int kidId, int biometricsId)
        {
            var biometricsToDelete = await _dbContext.Biometrics.FirstOrDefaultAsync(d => d.Kid.Id == kidId && d.Id == biometricsId);
            _dbContext.Biometrics.Remove(biometricsToDelete);
        }
        public async Task<BiometricsEntity> GetBiometricsAsync(int kidId, int biometricsId)
        {
            IQueryable<BiometricsEntity> query = _dbContext.Biometrics;
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(d => d.Id == biometricsId && d.Kid.Id == kidId);
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

        public async Task UpdateContactAsync(int kidId, int contactId, ContactEntity contact)
        {
            var contactToUpdate = await _dbContext.Contacts.FirstOrDefaultAsync(d => d.Id == contactId && d.Kid.Id == kidId);
            contactToUpdate.Name = contact.Name ?? contactToUpdate.Name;
            contactToUpdate.Relationship = contact.Relationship ?? contactToUpdate.Relationship;
            contactToUpdate.ContactNumber = contact.ContactNumber ?? contactToUpdate.ContactNumber;
            contactToUpdate.Address = contact.Address ?? contactToUpdate.Address;
        }

        public async Task DeleteContactAsync(int kidId, int contactId)
        {
            var contactToDelete = await _dbContext.Contacts.FirstOrDefaultAsync(d => d.Kid.Id == kidId && d.Id == contactId);
            _dbContext.Contacts.Remove(contactToDelete);
        }

        public async Task<ContactEntity> GetContactAsync(int kidId, int contactId)
        {
            IQueryable<ContactEntity> query = _dbContext.Contacts;
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(d => d.Id == contactId && d.Kid.Id == kidId);
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
        public async Task<EducationReportEntity> UpdateEducationReportAsync(int kidId, EducationReportEntity educationReport)
        {
            IQueryable<EducationReportEntity> query = _dbContext.EducationReports;
            var educationReportToUpdate = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            educationReportToUpdate.Rude = educationReport.Rude ?? educationReportToUpdate.Rude;
            educationReportToUpdate.School = educationReport.School ?? educationReportToUpdate.School;
            educationReportToUpdate.Grade = educationReport.Grade ?? educationReportToUpdate.Grade;
            return educationReportToUpdate;
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

        public async Task<FamilyReportEntity> UpdateFamilyReportAsync(int kidId, FamilyReportEntity familyReport)
        {
            IQueryable<FamilyReportEntity> query = _dbContext.FamilyReports;
            var familyReportToUpdate = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            familyReportToUpdate.SiblingsInFoundation = familyReport.SiblingsInFoundation ?? familyReportToUpdate.SiblingsInFoundation;
            familyReportToUpdate.SiblingsOutside = familyReport.SiblingsOutside ?? familyReportToUpdate.SiblingsOutside;
            familyReportToUpdate.HasExtendedFamily = familyReport.HasExtendedFamily ?? familyReportToUpdate.HasExtendedFamily;
            familyReportToUpdate.HasOriginFamily = familyReport.HasOriginFamily ?? familyReportToUpdate.HasOriginFamily;
            return familyReportToUpdate;
        }

        // KID FILE

        public async Task<KidEntity> GetKidAsync(int kidId)
        {
            IQueryable<KidEntity> query = _dbContext.Kids;
            query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(c => (c.Id == kidId) & (c.Status != EntityStatus.Deleted));
        }
        public async Task<IEnumerable<KidEntity>> GetKidsAsync()
        {
            IQueryable<KidEntity> query = _dbContext.Kids;
            query = query.AsNoTracking();
            query = query.Where( k => k.Status != EntityStatus.Deleted);
            query = query.OrderBy(k => k.FirstName).ThenBy(k => k.LastName);
            return await query.ToListAsync() ;
        }
        public void CreateKid(KidEntity kid)
        {
            _dbContext.Kids.Add(kid);
        }

        public bool UpdateKid(KidEntity kidModel)
        {
            var kidToUpdate = _dbContext.Kids.FirstOrDefault(c => c.Id == kidModel.Id);

            _dbContext.Entry(kidToUpdate).CurrentValues.SetValues(kidModel);
            return true;
        }

        public async Task DeleteKidAsync(int kidId)
        {
            var kidToDelete = await _dbContext.Kids.FirstOrDefaultAsync(c => c.Id == kidId);
            kidToDelete.Status = EntityStatus.Deleted;
            
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
        
        // FIXED ASSET

        public void CreateFixedAsset(FixedAssetEntity fixedAsset, int programHouseId)
        {
            _dbContext.Entry(fixedAsset.AssetType).State = EntityState.Unchanged;
            _dbContext.Entry(fixedAsset.ProgramHouse).State = EntityState.Unchanged;
            _dbContext.Entry(fixedAsset.AssetState).State = EntityState.Unchanged;
            _dbContext.Entry(fixedAsset.AssetResponsible).State = EntityState.Unchanged;
            _dbContext.FixedAssets.Add(fixedAsset);
        }

        public async Task<IEnumerable<FixedAssetEntity>> GetFixedAssetsAsync()
        {
            IQueryable<FixedAssetEntity> query = _dbContext.FixedAssets;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetType);
            query = query.Include(f => f.AssetType.AssetCategory);
            query = query.Include(f => f.ProgramHouse);
            query = query.Include(f => f.AssetState);
            query = query.Include(f => f.AssetResponsible);
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
            query = query.Include(f => f.AssetResponsible);
            var fixedAssetEntity = await query.FirstOrDefaultAsync(g => g.Id == fixedAssetId);
            return fixedAssetEntity;
        }

        public async Task UpdateFixedAssetAsync(int fixedAssetId, FixedAssetEntity fixedAsset)
        {
            var fixedAssetToUpdate = await _dbContext.FixedAssets.FirstOrDefaultAsync(f => f.Id == fixedAssetId);
            fixedAssetToUpdate.Code = fixedAsset.Code ?? fixedAssetToUpdate.Code;
            fixedAssetToUpdate.Name = fixedAsset.Name ?? fixedAssetToUpdate.Name;
            fixedAssetToUpdate.Price = fixedAsset.Price ?? fixedAssetToUpdate.Price;
            fixedAssetToUpdate.Location = fixedAsset.Location ?? fixedAssetToUpdate.Location;
            fixedAssetToUpdate.ProgramHouse = fixedAsset.ProgramHouse ?? fixedAssetToUpdate.ProgramHouse;
            fixedAssetToUpdate.AssetType = fixedAsset.AssetType ?? fixedAssetToUpdate.AssetType;
            fixedAssetToUpdate.AssetState = fixedAsset.AssetState ?? fixedAssetToUpdate.AssetState;
            fixedAssetToUpdate.AssetResponsible = fixedAsset.AssetResponsible ?? fixedAssetToUpdate.AssetResponsible;
        }

        // FOUNDATION REPORT
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

        public async Task<FoundationReportEntity> UpdateFoundationReportAsync(int kidId, FoundationReportEntity foundationReport)
        {
            IQueryable<FoundationReportEntity> query = _dbContext.FoundationReport;
            var foundationReportToUpdate = await query.FirstOrDefaultAsync(rep => (rep.KidId == kidId));
            foundationReportToUpdate.AdmissionDate = foundationReport.AdmissionDate ?? foundationReportToUpdate.AdmissionDate;
            foundationReportToUpdate.AdmissionReason = foundationReport.AdmissionReason ?? foundationReportToUpdate.AdmissionReason;
            return foundationReportToUpdate;
        }

        // PROGRAM
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

        // ASSETS

        public async Task<IEnumerable<AssetCategoryEntity>> GetAssetCategoriesAsync(bool showAssets = false)
        {
            IQueryable<AssetCategoryEntity> query = _dbContext.AssetCategories;
            query = query.AsNoTracking();
            query = query.Include(f => f.AssetTypes);
            query = query.Include(f => f.AssetTypes.Where(f=>f.Deleted==false));
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

        public async Task<AssetResponsibleEntity> CreateAssetResponsible(AssetResponsibleEntity assetResponsible)
        {
            await _dbContext.AssetResponsibles.AddAsync(assetResponsible);
            return assetResponsible;
        }

        public async Task<IEnumerable<AssetStateEntity>> GetAssetStatesAsync()
        {
            IQueryable<AssetStateEntity> query = _dbContext.AssetStates;
            query = query.AsNoTracking();
            query = query.Where(f => f.Deleted == false);
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<IEnumerable<AssetResponsibleEntity>> GetAssetResponsiblesAsync()
        {
            IQueryable<AssetResponsibleEntity> query = _dbContext.AssetResponsibles;
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

        public async Task<AssetResponsibleEntity> GetAssetResponsibleAsync(int assetResponsibleId)
        {
            IQueryable<AssetResponsibleEntity> query = _dbContext.AssetResponsibles;
            query = query.AsNoTracking();
            var assetResponsible = await query.FirstOrDefaultAsync(g => (g.Id == assetResponsibleId));
            return assetResponsible;
        }

        public async Task<bool> UpdateAssetStateAsync(int assetStateId, AssetStateEntity assetState)
        {
            var assetStateToUpdate = _dbContext.AssetStates.FirstOrDefault(c => c.Id == assetState.Id);

            _dbContext.Entry(assetStateToUpdate).CurrentValues.SetValues(assetState);
            return true;
        }

        public async Task<bool> UpdateAssetResponsibleAsync(int assetResponsibleId, AssetResponsibleEntity assetResponsible)
        {
            var assetResponsibleToUpdate = _dbContext.AssetResponsibles.FirstOrDefault(c => c.Id == assetResponsible.Id);

            _dbContext.Entry(assetResponsibleToUpdate).CurrentValues.SetValues(assetResponsible);
            return true;
        }

        public async Task DeleteAssetStateAsync(int assetStateId)
        {
            IQueryable<AssetStateEntity> query = _dbContext.AssetStates;
            var assetStateToDelete = await query.FirstOrDefaultAsync(g => (g.Id == assetStateId) & (g.Deleted == false));
            assetStateToDelete.Deleted = true;
        }

        public async Task DeleteAssetResponsibleAsync(int assetResponsibleId)
        {
            IQueryable<AssetResponsibleEntity> query = _dbContext.AssetResponsibles;
            var assetResponsibleToDelete = await query.FirstOrDefaultAsync(g => (g.Id == assetResponsibleId) & (g.Deleted == false));
            assetResponsibleToDelete.Deleted = true;
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
