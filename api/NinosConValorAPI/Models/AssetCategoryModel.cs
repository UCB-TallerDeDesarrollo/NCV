namespace NinosConValorAPI.Models
{
    public class AssetCategoryModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Code { get; set; }

        public IEnumerable<AssetTypeModel> AssetTypes { get; set; }

        public string Type { get; set; }

    }
}
