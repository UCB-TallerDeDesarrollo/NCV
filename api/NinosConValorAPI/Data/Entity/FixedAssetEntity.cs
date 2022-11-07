using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class FixedAssetEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nombre Requerido")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Precio Requerido")]
        public decimal? Price { get; set; }
        public string? Description { get; set; }
        public DateTime? EntryDate { get; set; }
        public string? Features { get; set; }

        [ForeignKey("ProgramHouseId")]
        public virtual ProgramHouseEntity? ProgramHouse { get; set; }
        
        [ForeignKey("AssetCategoryId")]
        public virtual AssetCategoryEntity? AssetCategory { get; set; }

        public string? State { get; set; }
    }
}
