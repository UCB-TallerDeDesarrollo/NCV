using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class AssetTypeService:IAssetTypeService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public AssetTypeService(INCVRepository nCVRepository, IMapper mapper)
        {
            _NCVRepository = nCVRepository;
            _mapper = mapper;
        }

        public async Task<AssetTypeModel> CreateAssetTypeAsync(AssetTypeModel assetType, int categoryId)
        {
            var assetTypeEntity = _mapper.Map<AssetTypeEntity>(assetType);
            assetTypeEntity.Deleted = false;
            _NCVRepository.CreateAssetType(assetTypeEntity, categoryId);
            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<AssetTypeModel>(assetTypeEntity);
            }
            throw new Exception("Database Error.");
        }

        public async Task<IEnumerable<AssetTypeModel>> GetAssetTypesAsync(int categoryId)
        {
            var assetTypesList = await _NCVRepository.GetAssetTypesAsync(categoryId);

            if (assetTypesList == null || !assetTypesList.Any())
                throw new NotFoundElementException($"La lista de estados no existe o está vacía.");

            return _mapper.Map<IEnumerable<AssetTypeModel>>(assetTypesList);
        }
        public async Task<AssetTypeModel> GetAssetTypeAsync(int typeId, int categoryId)
        {
            var type = await _NCVRepository.GetAssetTypeAsync(typeId, categoryId);
            if (type == null || type.Deleted)
                throw new NotFoundElementException($"El estado con Id:{typeId} no existe.");
            return _mapper.Map<AssetTypeModel>(type);
        }
        public async Task<AssetTypeModel> UpdateAssetTypeAsync(int typeId, AssetTypeModel typeModel, int categoryId)
        {
            var typeEntity = _mapper.Map<AssetTypeEntity>(typeModel);
            await GetAssetTypeAsync(typeId, categoryId);
            typeEntity.Id = typeId;
            var res = await _NCVRepository.UpdateAssetTypeAsync(typeId, typeEntity, categoryId);
            if (!res)
            {
                throw new Exception("Database Error");
            }
            var saveResult = await _NCVRepository.SaveChangesAsync();

            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            typeModel.Id = typeId;
            return typeModel;
        }

        private async Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync()
        {
            var fixedAssetEntityList = await _NCVRepository.GetFixedAssetsAsync();

            if (fixedAssetEntityList == null || !fixedAssetEntityList.Any())
                throw new NotFoundElementException($"La lista de Activos Fijos no existe o está vacía.");

            var fixedAssetEnumerable = _mapper.Map<IEnumerable<FixedAssetModel>>(fixedAssetEntityList);
            return fixedAssetEnumerable;
        }

        private async Task<bool> hasFixedAssetAssociated(int typeId, int categoryId)
        {
            var assets = await GetFixedAssetsAsync();
            assets = assets.Where(a => a.AssetTypeId == typeId);
            return assets.Count() > 0;
        }

        public async Task DeleteAssetTypeAsync(int typeId, int categoryId)
        {
            await GetAssetTypeAsync(typeId, categoryId);
            var cannotBeDeleted = await hasFixedAssetAssociated(typeId);
            if (cannotBeDeleted)
            {
                throw new InvalidElementOperationException("El estado no puede ser eliminado porque existen activos fijos asociados a el.");
            }
            await _NCVRepository.DeleteAssetTypeAsync(typeId, categoryId);
            var result = await _NCVRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }
    }
}
