using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class KidEntity
    {
        [Key]
        public int Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CI { get; set; }
        public DateTime? BirthDate { get; set; }
        public string ProgramHouse { get; set; }
        public string BirthPlace { get; set; }
        public string? Gender { get; set; }
    }
}
