namespace NinosConValorAPI.Models
{
    public class AssetCategoryModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public IEnumerable<FixedAssetModel> FixedAssets { get; set; }

    }
}
