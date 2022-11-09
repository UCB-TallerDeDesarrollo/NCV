using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class FoundationReportService : IFoundationReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public FoundationReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public async Task<FoundationReportModel> CreateFoundationReportAsync(int kidId, FoundationReportModel foundationReport)
        {
            foundationReport.KidId = kidId;
            var foundationReportEntity = _mapper.Map<FoundationReportEntity>(foundationReport);
            foundationReportEntity = await _appRepository.CreateFoundationReportAsync(foundationReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<FoundationReportModel>(foundationReportEntity);
            }
            throw new Exception("Database Error");
        }

        public Task DeleteFoundationReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public async Task<FoundationReportModel> GetFoundationReportAsync(int kidId)
        {
            await ValidateKidAsync(kidId);
            var foundationReportEntity = await _appRepository.GetFoundationReportAsync(kidId);
            if (foundationReportEntity == null)
                throw new NotFoundElementException($"The kid with id:{kidId} does not have a foundation report.");
            return _mapper.Map<FoundationReportModel>(foundationReportEntity);
        }

        public Task<FoundationReportModel> UpdateFoundationReportAsync(int kidId, FoundationReportModel qr)
        {
            throw new NotImplementedException();
        }
        private async Task ValidateKidAsync(int kidId)
        {
            var kid = await _appRepository.GetKidAsync(kidId);
            if (kid == null)
            {
                throw new NotFoundElementException($"The kid with id: {kidId} doesn't exists.");
            }
        }
    }
}
