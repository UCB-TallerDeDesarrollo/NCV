using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class FoundationReport
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        [Required]
        public string? AdmissionDate { get; set; }
        [Required]
        public string? AdmissionReason { get; set; }
        [Required]
        public string? AdmissionAge { get; set; }
        [Required]
        public string? TimeInFoundation { get; set; }
        [Required]
    }
}
