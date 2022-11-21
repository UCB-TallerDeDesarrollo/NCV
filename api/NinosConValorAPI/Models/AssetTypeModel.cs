namespace NinosConValorAPI.Models
{
    public class AssetTypeModel
    {
        public int Id { get; set; }
        public int AssetCategoryId { get; set; }
        public string? AssetCategoryCategory { get; set; }

        public bool Deleted { get; set; }
    }
}
