using AutoMapper;
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

        public Task<AssetCategoryModel> CreateAssetCategoryAsync(AssetCategoryModel assetCategory)
        {
            throw new NotImplementedException();
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
