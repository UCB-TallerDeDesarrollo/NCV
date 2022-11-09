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
        
    }
}
