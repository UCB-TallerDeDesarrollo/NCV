using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class AssetResponsibleEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Deleted { get; set; }

        public ICollection<FixedAssetEntity>? FixedAssets { get; set; }
    }
}

