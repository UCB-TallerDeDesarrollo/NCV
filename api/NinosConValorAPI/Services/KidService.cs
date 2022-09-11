using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using System.Security.Cryptography;

namespace NinosConValorAPI.Services
{
    public class KidService : IKidService
    {
        private IKidRepository _kidRepository;
        private IMapper _mapper;

        public KidService(IKidRepository kidRepository, IMapper mapper)
        {
            _kidRepository = kidRepository;
            _mapper = mapper;
        }


        public KidModel CreateKid(KidModel kid)
        {
            var kidEntity = _mapper.Map<KidEntity>(kid);
            var kidResponse = _kidRepository.CreateKid(kidEntity);
            return _mapper.Map<KidModel>(kidResponse);
        }

        public KidModel GetKid(int kidId)
        {
            var kid = _kidRepository.GetKid(kidId);

            return _mapper.Map<KidModel>(kid);
        }

        public IEnumerable<KidModel> GetKids()
        {
            var KidsEntityList = _kidRepository.GetKids();
            return _mapper.Map<IEnumerable<KidModel>>(KidsEntityList);
        }

       
    }
}
