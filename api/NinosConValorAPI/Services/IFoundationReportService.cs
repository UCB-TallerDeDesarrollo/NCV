using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IFoundationReportService
    {
        Task<FoundationReportModel> CreateFoundationReportAsync(int kidId,FoundationReportModel foundationReport);
        Task<FoundationReportModel> GetFoundationReportAsync(int kidId);
        Task DeleteFoundationReportAsync(int kidId);
        Task<FoundationReportModel> UpdateFoundationReportAsync(int kidId, FoundationReportModel qr);
    }
}
