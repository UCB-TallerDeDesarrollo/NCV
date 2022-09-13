using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class KidService : IKidService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public KidService(INCVRepository kidRepository, IMapper mapper)
        {
            _NCVRepository = kidRepository;
            _mapper = mapper;
        }
        public async Task<KidModel> CreateKidAsync(KidModel kid)
        {
            var kidEntity = _mapper.Map<KidEntity>(kid);
            _NCVRepository.CreateKid(kidEntity);
            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<KidModel>(kidEntity);
            }
            throw new Exception("Database Error");
        }
        public async Task<KidModel> GetKidAsync(int kidID)
        {
            var kid = await _NCVRepository.GetKidAsync(kidID);

            return _mapper.Map<KidModel>(kid);
        }
        public async Task<IEnumerable<KidModel>> GetKidsAsync(){
            var listKids = await _NCVRepository.GetKidsAsync();
            return _mapper.Map<IEnumerable<KidModel>>(listKids);
        }

    }
}
