using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class FixedAssetEntity
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime EntryDate { get; set; }
        public Decimal Price { get; set; }
        public string? Features { get; set; }
        public int Quantity { get; set; }
    }
}
