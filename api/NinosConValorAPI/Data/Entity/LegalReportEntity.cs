using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class LegalReportEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }
        public string? CourtNumber { get; set; }
        public string? Dna { get; set; }
        public string? Nurej { get; set; }
        public string? LegalProcesses { get; set; }
    }
}
