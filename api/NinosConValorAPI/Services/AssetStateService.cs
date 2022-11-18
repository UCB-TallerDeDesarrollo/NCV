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
            assetStateEntity.Deleted = false;
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
        public async Task<AssetStateModel> GetAssetStateAsync(int stateID)
        {
            var state = await _NCVRepository.GetAssetStateAsync(stateID);
            if (state == null || state.Deleted)
                throw new NotFoundElementException($"El estado con Id:{stateID} no existe.");
            return _mapper.Map<AssetStateModel>(state);
        }
        public async Task<AssetStateModel> UpdateAssetStateAsync(int stateId, AssetStateModel stateModel)
        {
            var stateEntity = _mapper.Map<AssetStateEntity>(stateModel);
            await GetAssetStateAsync(stateId);
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
            stateModel.Id = stateId;
            return stateModel;
        }

        private async Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync()
        {
            var fixedAssetEntityList = await _NCVRepository.GetFixedAssetsAsync();

            if (fixedAssetEntityList == null || !fixedAssetEntityList.Any())
                throw new NotFoundElementException($"La lista de Activos Fijos no existe o está vacía.");

            var fixedAssetEnumerable = _mapper.Map<IEnumerable<FixedAssetModel>>(fixedAssetEntityList);
            return fixedAssetEnumerable;
        }

        private async Task<bool> hasFixedAssetAssociated(int stateID)
        {
            var assets = await GetFixedAssetsAsync();
            assets = assets.Where(a => a.AssetStateId == stateID);
            return assets.Count() > 0;
        }

        public async Task DeleteAssetStateAsync(int stateID)
        {
            await GetAssetStateAsync(stateID);
            var cannotBeDeleted = await hasFixedAssetAssociated(stateID);
            if (cannotBeDeleted)
            {
                throw new InvalidElementOperationException("El estado no puede ser eliminado porque existen activos fijos asociados a el.");
            }
            await _NCVRepository.DeleteAssetStateAsync(stateID);
            var result = await _NCVRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }
    }
}
