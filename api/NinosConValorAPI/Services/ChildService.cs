using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class ChildService : IChildService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public ChildService(INCVRepository childRepository, IMapper mapper)
        {
            _NCVRepository = childRepository;
            _mapper = mapper;
        }

        public ChildModel CreateChild(ChildModel child)
        {
            var childEntity = _mapper.Map<ChildEntity>(child);
            var childResponse = _NCVRepository.CreateChild(childEntity);
            return _mapper.Map<ChildModel>(childResponse);
        }
        public ChildModel GetChild(int childId)
        {
            var child = _NCVRepository.GetChild(childId);

            return _mapper.Map<ChildModel>(child);

        }

    }
}
