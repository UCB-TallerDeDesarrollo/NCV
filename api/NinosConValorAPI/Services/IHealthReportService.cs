using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IHealthReportService
    {
        Task<HealthReportModel> CreateHealthReportAsync(HealthReportModel healthReport);
    }
}
