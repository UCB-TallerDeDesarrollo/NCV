using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class HealthReportEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }
        public string? BloodType { get; set; }
        public string? CIDiscapacidad { get; set; }
        public string? PsychologicalDiagnosis { get; set; }
        public string? NeurologicalDiagnosis { get; set; }
        public string? SpecialDiagnosis { get; set; }
        public string? HealthProblems { get; set; }
    }
}
