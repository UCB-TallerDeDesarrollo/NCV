namespace NinosConValorAPI.Models
{
    public class AssetStateModel
    {
        public int Id { get; set; }
        public string State { get; set; }
        public IEnumerable<FixedAssetModel>? FixedAssets { get; set; }
    }
}
