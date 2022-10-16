using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class ProgramHouseService: IProgramHouseService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public ProgramHouseService(INCVRepository nCVRepository, IMapper mapper)
        {
            _NCVRepository = nCVRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProgramHouseModel>> GetProgramHousesAsync()
        {
            var programHousesList = await _NCVRepository.GetProgramHousesAsync();

            if (programHousesList == null || !programHousesList.Any())
                throw new NotFoundElementException($"La lista de programas no existe o está vacía.");

            return _mapper.Map<IEnumerable<ProgramHouseModel>>(programHousesList);
        }
    }
}
