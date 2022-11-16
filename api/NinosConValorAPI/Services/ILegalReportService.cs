using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface ILegalReportService
    {
        Task<LegalReportModel> CreateLegalReportAsync(int kidId, LegalReportModel legalReport);
        Task<LegalReportModel> GetLegalReportAsync(int kidId);
        Task DeleteLegalReportAsync(int kidId);
        Task<LegalReportModel> UpdateLegalReportAsync(int kidId, LegalReportModel legalReport);
    }
}
