using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IHealthReportService
    {
        Task<HealthReportModel> CreateHealthReportAsync(int kidId,HealthReportModel healthReport);
        Task<HealthReportModel> GetHealthReportAsync(int kidId);
        Task DeleteHealthReportAsync(int kidId);
        Task<HealthReportModel> UpdateHealthReportAsync(int kidId, HealthReportModel qr);
    }
}
