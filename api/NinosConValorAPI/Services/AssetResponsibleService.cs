using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
	public class AssetResponsibleService : IAssetResponsibleService
	{
		private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public AssetResponsibleService(INCVRepository nCVRepository, IMapper mapper)
        {
            _NCVRepository = nCVRepository;
            _mapper = mapper;
        }

        public async Task<AssetResponsibleModel> CreateAssetResponsibleAsync(AssetResponsibleModel assetResponsible)
        {
            var assetResponsibleEntity = _mapper.Map<AssetResponsibleEntity>(assetResponsible);
            assetResponsibleEntity.Deleted = false;
            _NCVRepository.CreateAssetResponsible(assetResponsibleEntity);
            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<AssetResponsibleModel>(assetResponsibleEntity);
            }
            throw new Exception("Database Error.");
        }

        public async Task<IEnumerable<AssetResponsibleModel>> GetAssetResponsiblesAsync()
        {
            var assetResponsiblesList = await _NCVRepository.GetAssetResponsiblesAsync();

            if (assetResponsiblesList == null || !assetResponsiblesList.Any())
                throw new NotFoundElementException($"La lista de estados no existe o está vacía.");

            return _mapper.Map<IEnumerable<AssetResponsibleModel>>(assetResponsiblesList);
        }
        public async Task<AssetResponsibleModel> GetAssetResponsibleAsync(int responsibleId)
        {
            var responsible = await _NCVRepository.GetAssetResponsibleAsync(responsibleId);
            if (responsible == null || responsible.Deleted)
                throw new NotFoundElementException($"El responsable con Id:{responsibleId} no existe.");
            return _mapper.Map<AssetResponsibleModel>(responsible);
        }
        public async Task<AssetResponsibleModel> UpdateAssetResponsibleAsync(int responsibleId, AssetResponsibleModel responsibleModel)
        {
            var responsibleEntity = _mapper.Map<AssetResponsibleEntity>(responsibleModel);
            await GetAssetResponsibleAsync(responsibleId);
            responsibleEntity.Id = responsibleId;
            var res = await _NCVRepository.UpdateAssetResponsibleAsync(responsibleId, responsibleEntity);
            if (!res)
            {
                throw new Exception("Database Error");
            }
            var saveResult = await _NCVRepository.SaveChangesAsync();

            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            responsibleModel.Id = responsibleId;
            return responsibleModel;
        }

        private async Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync()
        {
            var fixedAssetEntityList = await _NCVRepository.GetFixedAssetsAsync();

            if (fixedAssetEntityList == null || !fixedAssetEntityList.Any())
                throw new NotFoundElementException($"La lista de Activos Fijos no existe o está vacía.");

            var fixedAssetEnumerable = _mapper.Map<IEnumerable<FixedAssetModel>>(fixedAssetEntityList);
            return fixedAssetEnumerable;
        }

        private async Task<bool> hasFixedAssetAssociated(int responsibleId)
        {
            var assets = await GetFixedAssetsAsync();
            assets = assets.Where(a => a.AssetResponsibleId == responsibleId);
            return assets.Count() > 0;
        }

        public async Task DeleteAssetResponsibleAsync(int responsibleId)
        {
            await GetAssetResponsibleAsync(responsibleId);
            var cannotBeDeleted = await hasFixedAssetAssociated(responsibleId);
            if (cannotBeDeleted)
            {
                throw new InvalidElementOperationException("El responsable no puede ser eliminado porque existen activos fijos asociados a el.");
            }
            await _NCVRepository.DeleteAssetResponsibleAsync(responsibleId);
            var result = await _NCVRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }
    }
}

