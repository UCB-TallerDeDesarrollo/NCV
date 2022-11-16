using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class FoundationReportEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public string? AdmissionReason { get; set; }
    }
}
