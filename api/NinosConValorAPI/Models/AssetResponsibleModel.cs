namespace NinosConValorAPI.Models
{
    public class AssetResponsibleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<FixedAssetModel>? FixedAssets { get; set; }
    }
}

