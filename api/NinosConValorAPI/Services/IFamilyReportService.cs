using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IFamilyReportService
    {
        Task<FamilyReportModel> CreateFamilyReportAsync(int kidId,FamilyReportModel familyReportModel);
        Task<FamilyReportModel> GetFamilyReportAsync(int kidId);
        Task<FamilyReportModel> UpdateFamilyReportAsync(int kidId, FamilyReportModel familyReport);
    }
}
