using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class LegalReportService : ILegalReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public LegalReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public async Task<LegalReportModel> CreateLegalReportAsync(int kidId, LegalReportModel legalReport)
        {
            legalReport.KidId = kidId;
            var legalReportEntity = _mapper.Map<LegalReportEntity>(legalReport);
            legalReportEntity = await _appRepository.CreateLegalReportAsync(legalReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<LegalReportModel>(legalReportEntity);
            }
            throw new Exception("Database Error");
        }

        public Task DeleteLegalReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public async Task<LegalReportModel> GetLegalReportAsync(int kidId)
        {
            await ValidateKidAsync(kidId);
            var legalReportEntity = await _appRepository.GetLegalReportAsync(kidId);
            if (legalReportEntity == null)
                throw new NotFoundElementException($"The kid with id:{kidId} does not have a health report.");
            return _mapper.Map<LegalReportModel>(legalReportEntity);
        }

        public async Task<LegalReportModel> UpdateLegalReportAsync(int kidId, LegalReportModel legalReportModel)
        {
            await ValidateKidAsync(kidId);
            var legalReportEntity = _mapper.Map<LegalReportEntity>(legalReportModel);
            legalReportEntity = await _appRepository.UpdateLegalReportAsync(kidId, legalReportEntity);
            var saveResult = await _appRepository.SaveChangesAsync();
            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            return _mapper.Map<LegalReportModel>(legalReportEntity);
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
