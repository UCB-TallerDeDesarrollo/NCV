using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class AssetCategoryEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        
        [Required]
        public string Category { get; set; }
        public string Code { get; set; }

        public ICollection<AssetTypeEntity>? AssetTypes { get; set; }
        
    }
}
