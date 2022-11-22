using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class AssetTypeEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        [ForeignKey("AssetCategoryId")]
        public virtual AssetCategoryEntity? AssetCategory { get; set; }

        public ICollection<FixedAssetEntity>? FixedAssets { get; set; }

        public bool Deleted { get; set; }
       
    }
}
