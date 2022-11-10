using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class AssetStateEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string State { get; set; }

        public ICollection<FixedAssetEntity>? FixedAssets { get; set; }
    }
}
