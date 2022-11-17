using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class FamilyReportService : IFamilyReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;

        public FamilyReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }
        
        public async Task<FamilyReportModel> GetFamilyReportAsync(int kidId)
        {
            await ValidateKidAsync(kidId);
            var familyReportEntity = await _appRepository.GetFamilyReportAsync(kidId);
            if (familyReportEntity == null)
                throw new NotFoundElementException($"The kid with id:{kidId} does not have a family report.");
            return _mapper.Map<FamilyReportModel>(familyReportEntity);
        }

        public async Task<FamilyReportModel> CreateFamilyReportAsync(int kidId, FamilyReportModel familyReport)
        {
            var familyReportEntity = _mapper.Map<FamilyReportEntity>(familyReport);
            familyReportEntity.KidId = kidId;
            familyReportEntity = await _appRepository.CreateFamilyReportAsync(familyReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<FamilyReportModel>(familyReportEntity);
            }
            throw new Exception("Database Error");
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
