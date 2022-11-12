using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class AssetStateService : IAssetStateService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public AssetStateService(INCVRepository nCVRepository, IMapper mapper)
        {
            _NCVRepository = nCVRepository;
            _mapper = mapper;
        }

        public async Task<AssetStateModel> CreateAssetStateAsync(AssetStateModel assetState)
        {
            var assetStateEntity = _mapper.Map<AssetStateEntity>(assetState);
            _NCVRepository.CreateAssetState(assetStateEntity);
            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<AssetStateModel>(assetStateEntity);
            }
            throw new Exception("Database Error.");
        }

        public async Task<IEnumerable<AssetStateModel>> GetAssetStatesAsync()
        {
            var assetStatesList = await _NCVRepository.GetAssetStatesAsync();

            if (assetStatesList == null || !assetStatesList.Any())
                throw new NotFoundElementException($"La lista de estados no existe o está vacía.");

            return _mapper.Map<IEnumerable<AssetStateModel>>(assetStatesList);
        }
        public async Task<AssetStateModel> GetStateAsync(int stateID)
        {
            var state = await _NCVRepository.GetAssetStateAsync(stateID);

            return _mapper.Map<AssetStateModel>(state);
        }
        public async Task<AssetStateModel> UpdateStateAsync(int stateId, AssetStateModel stateModel)
        {
            var stateEntity = _mapper.Map<AssetStateEntity>(stateModel);
            await GetStateAsync(stateId);
            stateEntity.Id = stateId;
            var res = await _NCVRepository.UpdateAssetStateAsync(stateId, stateEntity);
            if (!res)
            {
                throw new Exception("Database Error");
            }
            var saveResult = await _NCVRepository.SaveChangesAsync();

            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            return stateModel;
        }


    }
}
