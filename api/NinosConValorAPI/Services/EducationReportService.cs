using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class EducationReportService : IEducationReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public EducationReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public async Task<EducationReportModel> CreateEducationReportAsync(int kidId, EducationReportModel educationReport)
        {
            educationReport.KidId = kidId;
            var educationReportEntity = _mapper.Map<EducationReportEntity>(educationReport);
            educationReportEntity = await _appRepository.CreateEducationReportAsync(educationReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<EducationReportModel>(educationReportEntity);
            }
            throw new Exception("Database Error");
        }
        public async Task<EducationReportModel> GetEducationReportAsync(int kidId)
        {
            await ValidateKidAsync(kidId);
            var educationReportEntity = await _appRepository.GetEducationReportAsync(kidId);
            if (educationReportEntity == null)
                throw new NotFoundElementException($"The kid with id:{kidId} does not have a education report.");
            return _mapper.Map<EducationReportModel>(educationReportEntity);
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
