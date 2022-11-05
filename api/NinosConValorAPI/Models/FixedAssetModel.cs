using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Models
{
    public class FixedAssetModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Nombre Requerido")]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? EntryDate { get; set; }

        [Required(ErrorMessage = "Precio Requerido")]
        public decimal? Price { get; set; }
        public string? Features { get; set; }

        [Required(ErrorMessage = "Cantidad Requerida")]
        public int? Quantity { get; set; }
        public int ProgramHouseId { get; set; }
        public int AssetCategoryId { get; set; }
        public string? AssetCategoryCategory { get; set; }
        public string? ProgramHouseName { get; set; }
        public string? ProgramHouseAcronym { get; set; }

        public string? State { get; set; }
    }
}
