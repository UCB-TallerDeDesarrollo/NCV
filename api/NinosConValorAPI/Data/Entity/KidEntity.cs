using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string? ProgramHouse { get; set; }
        public string? BirthPlace { get; set; }
        public string? Gender { get; set; }

        public virtual HealthReportEntity? HealthReport { get; set; }
        public virtual LegalReportEntity? LegalReport { get; set; }
        public ICollection<BiometricsEntity> Biometrics { get; set; }
    }
}
