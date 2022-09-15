using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class HealthReportService : IHealthReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public HealthReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public async Task<HealthReportModel> CreateHealthReportAsync(int kidId, HealthReportModel healthReport)
        {
            healthReport.KidId = kidId;
            var healthReportEntity = _mapper.Map<HealthReportEntity>(healthReport);
            healthReportEntity = await _appRepository.CreateHealthReportAsync(healthReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<HealthReportModel>(healthReportEntity);
            }
            throw new Exception("Database Error");
        }

        public Task DeleteHealthReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public Task<HealthReportModel> GetHealthReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public Task<HealthReportModel> UpdateHealthReportAsync(int kidId, HealthReportModel qr)
        {
            throw new NotImplementedException();
        }
    }
}
