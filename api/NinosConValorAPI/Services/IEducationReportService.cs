using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IEducationReportService
    {
        Task<EducationReportModel> CreateEducationReportAsync(int kidId,EducationReportModel educationReport);
        Task<EducationReportModel> GetEducationReportAsync(int kidId);
    }
}
