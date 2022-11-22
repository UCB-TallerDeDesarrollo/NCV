using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public enum EntityStatus
    {
        Deleted,
        Active
    }
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
        public EntityStatus Status { get; set; }  = EntityStatus.Active;

        public virtual HealthReportEntity? HealthReport { get; set; }
        public virtual FoundationReportEntity? FoundationReport { get; set; }
        public virtual LegalReportEntity? LegalReport { get; set; }
        public virtual FamilyReportEntity? FamilyReport { get; set; }
        public virtual ICollection<BiometricsEntity> Biometrics { get; set; }
        public virtual ICollection<ContactEntity> Contacts { get; set; }
    }
}
