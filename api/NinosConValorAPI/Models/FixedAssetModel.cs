namespace NinosConValorAPI.Models
{
    public class FixedAssetModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? EntryDate { get; set; }
        public decimal? Price { get; set; }
        public string? Features { get; set; }
        public int Quantity { get; set; }

        public int ProgramHouseId { get; set; }
    }
}
