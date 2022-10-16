
﻿using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data.Entity;
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

        // FIXED ASSET

        public void CreateFixedAsset(FixedAssetEntity fixedAsset)
        {
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

            return await query.ToListAsync() ;
        }
        public void CreateKid(KidEntity kid)
        {
            _dbContext.Kids.Add(kid);
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
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<FixedAssetEntity> GetFixedAssetAsync(int fixedAssetId)
        {
            IQueryable<FixedAssetEntity> query = _dbContext.FixedAssets;
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(g => g.Id == fixedAssetId);
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

        public Task<HealthReportEntity> UpdateHealthReportAsync(int kidId, HealthReportEntity healthReport)
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
    }
}
