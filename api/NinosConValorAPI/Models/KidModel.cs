namespace NinosConValorAPI.Models
{
    public class KidModel
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CI { get; set; }
        public DateTime? BirthDate { get; set; }
        public int ProgramHouseId { get; set; }
        public DateTime? BirthPlace { get; set; }
        public string? Gender { get; set; }
    }
}
