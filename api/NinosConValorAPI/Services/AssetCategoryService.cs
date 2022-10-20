using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
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

        public Task<IEnumerable<AssetCategoryModel>> GetAssetCategoriesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AssetCategoryModel> GetAssetCategoryAsync(int categoryId)
        {
            throw new NotImplementedException();
        }
    }
}
