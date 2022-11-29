using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class FoundationReportService : IFoundationReportService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public FoundationReportService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public async Task<FoundationReportModel> CreateFoundationReportAsync(int kidId, FoundationReportModel foundationReport)
        {
            await ValidateKidAsync(kidId);
            foundationReport.KidId = kidId;
            var foundationReportEntity = _mapper.Map<FoundationReportEntity>(foundationReport);
            foundationReportEntity = await _appRepository.CreateFoundationReportAsync(foundationReportEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<FoundationReportModel>(foundationReportEntity);
            }
            throw new Exception("Database Error");
        }

        public Task DeleteFoundationReportAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public async Task<FoundationReportModel> GetFoundationReportAsync(int kidId)
        {
            await ValidateKidAsync(kidId);
            var foundationReportEntity = await _appRepository.GetFoundationReportAsync(kidId);
            if (foundationReportEntity == null)
                throw new NotFoundElementException($"The kid with id:{kidId} does not have a foundation report.");
            var foundationReportModel = _mapper.Map<FoundationReportModel>(foundationReportEntity);
            var kid = await _appRepository.GetKidAsync(kidId);
            DateTime birthDate = (DateTime) kid.BirthDate;
            DateTime admissionDate = (DateTime) foundationReportModel.AdmissionDate;
            foundationReportModel.AdmissionAge = (admissionDate.Year - birthDate.Year).ToString();
            DateTime today = DateTime.Today;
            foundationReportModel.TimeInFoundation = (today.Year - admissionDate.Year).ToString();
            return foundationReportModel;
        }

        public async Task<FoundationReportModel> UpdateFoundationReportAsync(int kidId, FoundationReportModel foundationReportModel)
        {
            await ValidateKidAsync(kidId);
            var foundationReportEntity = _mapper.Map<FoundationReportEntity>(foundationReportModel);
            foundationReportEntity = await _appRepository.UpdateFoundationReportAsync(kidId, foundationReportEntity);
            var saveResult = await _appRepository.SaveChangesAsync();
            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            return _mapper.Map<FoundationReportModel>(foundationReportEntity);
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
