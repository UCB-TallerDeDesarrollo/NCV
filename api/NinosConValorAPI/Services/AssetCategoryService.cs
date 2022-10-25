using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public class AssetCategoryService : IAssetCategoryService
    {
        private INCVRepository _NCVRepository;
        private IMapper _mapper;
        public AssetCategoryService(INCVRepository nCVRepository, IMapper mapper)
        {
            _NCVRepository = nCVRepository;
            _mapper = mapper;
        }

        public async Task<AssetCategoryModel> CreateAssetCategoryAsync(AssetCategoryModel assetCategory)
        {
            var assetCategoryEntity = _mapper.Map<AssetCategoryEntity>(assetCategory);
            _NCVRepository.CreateAssetCategory(assetCategoryEntity);
            var result = await _NCVRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<AssetCategoryModel>(assetCategoryEntity);
            }
            throw new Exception("Database Error.");
        }

        public async Task<IEnumerable<AssetCategoryModel>> GetAssetCategoriesAsync(bool showAssets = false)        {
            var assetCategoriesList = await _NCVRepository.GetAssetCategoriesAsync(showAssets);

            if (assetCategoriesList == null || !assetCategoriesList.Any())
                throw new NotFoundElementException($"La lista de categorías no existe o está vacía.");

            return _mapper.Map<IEnumerable<AssetCategoryModel>>(assetCategoriesList);
        }

        public async Task<AssetCategoryModel> GetAssetCategoryAsync(int categoryId)
        {
            var assetCategoryEntity = await _NCVRepository.GetAssetCategoryAsync(categoryId);

            if (assetCategoryEntity == null)
                throw new NotFoundElementException($"La categoría con id:{categoryId} no existe.");

            return _mapper.Map<AssetCategoryModel>(assetCategoryEntity);
        }
    }
}
