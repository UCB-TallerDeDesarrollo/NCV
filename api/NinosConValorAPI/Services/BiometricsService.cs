using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Services
{
    public class BiometricsService : IBiometricsService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;
        public BiometricsService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<BiometricsModel>> GetBiometricsAsync(int kidId)
        {
            var biometricsList = await _appRepository.GetBiometricsAsync(kidId);
            return _mapper.Map<IEnumerable<BiometricsModel>>(biometricsList);
        }

        public async Task<BiometricsModel> CreateBiometricsAsync(int kidId, BiometricsModel biometrics)
        {
            await ValidateIdKidAsync(kidId);
            var biometricsEntity = _mapper.Map<BiometricsEntity>(biometrics);
            biometricsEntity.KidId = kidId;
            var newSavedbiometrics = await _appRepository.CreateBiometricsAsync(biometricsEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<BiometricsModel>(newSavedbiometrics);
            }
            throw new Exception("Database Error");
        }

        public async Task DeleteBiometricsAsync(int kidId, int biometricsId)
        {
            await GetBiometricAsync(kidId, biometricsId);
            await _appRepository.DeleteBiometricsAsync(kidId, biometricsId);
            var result = await _appRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");

            }
        }

        public async Task<BiometricsModel> GetBiometricAsync(int kidId, int biometricId)
        {
            await ValidateIdKidAsync(kidId);

            var biometrics = await _appRepository.GetBiometricsAsync(kidId, biometricId);
            if (biometrics == null)
                throw new Exception($"the Biometrics with id:{biometricId} does not exists for the given kid with id: {kidId}.");

            return _mapper.Map<BiometricsModel>(biometrics);
        }
        private async Task ValidateIdKidAsync(int kidId)
        {
            var kid = await _appRepository.GetKidAsync(kidId);
            if (kid == null)
            {
                throw new Exception($"El niño con el id: {kidId} no existe en la base de datos.");
            }
        }
    }
}
