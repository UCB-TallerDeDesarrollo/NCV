using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;

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

        public Task<HealthReportModel> CreateHealthReportAsync(int kidId, HealthReportModel healthReport)
        {
            throw new NotImplementedException();
        }
    }
}
