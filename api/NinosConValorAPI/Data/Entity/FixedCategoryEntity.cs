using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class FixedCategoryEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        
        [Required]
        public string Category { get; set; }

        public ICollection<FixedAssetEntity>? FixedAssets { get; set; }
    }
}
