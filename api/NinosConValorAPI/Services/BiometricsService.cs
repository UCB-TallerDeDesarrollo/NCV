using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;

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

        public Task<BiometricsModel> CreateBiometricsAsync(int kidId, BiometricsModel biometrics)
        {
            throw new NotImplementedException();
        }

        public Task DeleteBiometricsAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public Task<BiometricsModel> UpdateBiometricsAsync(int kidId, BiometricsModel biometrics)
        {
            throw new NotImplementedException();
        }
    }
}
