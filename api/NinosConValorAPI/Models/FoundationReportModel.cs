using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class FoundationReportModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        [Required]
        public DateTime? AdmissionDate { get; set; }
        [Required]
        public string? AdmissionReason { get; set; }
        public string? AdmissionAge { get; set; }
        public string? TimeInFoundation { get; set; }
    }
}
