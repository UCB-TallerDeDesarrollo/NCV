namespace NinosConValorAPI.Models
{
    public class ProgramHouseModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Acronym { get; set; }
        public string? Location { get; set; }
        public string? ResponsibleId { get; set; }

        //fixed assets that belong to the program house
        public IEnumerable<FixedAssetModel> FixedAssets { get; set; }
    }
}
