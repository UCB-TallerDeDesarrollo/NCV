using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using System.Collections.Immutable;

namespace NinosConValorAPI.Services
{
    public class FixedAssetService : IFixedAssetService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public FixedAssetService(INCVRepository fixedAssetRepository, IMapper mapper)
        {
            _NCVRepository = fixedAssetRepository;
            _mapper = mapper;
        }

        private async Task<ProgramHouseEntity> GetProgramHouseAsync(int programHouseId)
        {
            var programHouse = await _NCVRepository.GetProgramHouseAsync(programHouseId);
            if (programHouse == null)
                throw new NotFoundElementException($"El programa con id {programHouseId} no se encontrós");
            return programHouse;
        }

        private async Task GetAssetCategoryAsync(int categoryId)
        {
            var assetCategoryEntity = await _NCVRepository.GetAssetCategoryAsync(categoryId);
            if (assetCategoryEntity == null)
                throw new NotFoundElementException($"La categoría con Id:{categoryId} no existe.");
        }

        private async Task GetAssetStateAsync(int stateId)
        {
            var assetStateEntity = await _NCVRepository.GetAssetStateAsync(stateId);
            if (assetStateEntity == null)
                throw new NotFoundElementException($"El estado con Id:{stateId} no existe.");
        }

        public async Task<FixedAssetModel> CreateFixedAssetAsync(FixedAssetModel fixedAsset, int programHouseId, int categoryId)
        {

            await GetProgramHouseAsync(programHouseId);
            await GetAssetCategoryAsync(categoryId);
            await GetAssetStateAsync(fixedAsset.AssetStateId);
            fixedAsset.ProgramHouseId = programHouseId;
            fixedAsset.AssetCategoryId = categoryId;
            var fixedAssetEntity = _mapper.Map<FixedAssetEntity>(fixedAsset);
            _NCVRepository.CreateFixedAsset(fixedAssetEntity, programHouseId, categoryId);
            var result = await _NCVRepository.SaveChangesAsync();
            
            if (result)
            {
                if (fixedAssetEntity.Name == null || fixedAssetEntity.Price == null)
                {
                    throw new NotFoundElementException($"Ocurrio un error al crear el Activo Fijo, faltan datos o paso algo inesperado.");
                }
                return _mapper.Map<FixedAssetModel>(fixedAssetEntity);
            }
            throw new Exception("Error en la base de datos.");
        }

        public async Task<IEnumerable<FixedAssetModel>> GetFixedAssetsAsync()
        {
            var fixedAssetEntityList = await _NCVRepository.GetFixedAssetsAsync();
            
            if (fixedAssetEntityList == null || !fixedAssetEntityList.Any())
                throw new NotFoundElementException($"La lista de Activos Fijos no existe o está vacía.");

            var fixedAssetEnumerable = _mapper.Map<IEnumerable<FixedAssetModel>>(fixedAssetEntityList);
            return fixedAssetEnumerable;
        }

        public async Task<FixedAssetModel> GetFixedAssetAsync(int fixedAssetId)
        {
            var fixedAsset = await _NCVRepository.GetFixedAssetAsync(fixedAssetId);

            if (fixedAsset == null)
                throw new NotFoundElementException($"El activo fijo con Id:{fixedAssetId} no existe.");

            var fixedAssetEnumerable = _mapper.Map<FixedAssetModel>(fixedAsset);
            return fixedAssetEnumerable;
        }

        public async Task<FixedAssetModel> UpdateFixedAssetAsync(int fixedAssetId, FixedAssetModel fixedAsset)
        {
            await GetFixedAssetAsync(fixedAssetId);
            var fixedAssetEntity = _mapper.Map<FixedAssetEntity>(fixedAsset);
            fixedAssetEntity.Id = fixedAssetId;
            await _NCVRepository.UpdateFixedAssetAsync(fixedAssetId, fixedAssetEntity);

            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<FixedAssetModel>(fixedAssetEntity);
            }

            throw new Exception("Error en la base de datos.");
        }

        public async Task DeleteFixedAssetAsync(int fixedAssetId)
        {
            //validate if it exist
            await GetFixedAssetAsync(fixedAssetId);
            await _NCVRepository.DeleteFixedAssetAsync(fixedAssetId);
            var result = await _NCVRepository.SaveChangesAsync();
        }
    }
}
