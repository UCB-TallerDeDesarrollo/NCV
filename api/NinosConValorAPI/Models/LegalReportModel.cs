using System.ComponentModel.DataAnnotations;
namespace NinosConValorAPI.Models
{
    public class LegalReportModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public string? CourtNumber { get; set; }
        [Required(ErrorMessage = "DNA  required")]
        public string? Dna { get; set; }
        [Required(ErrorMessage = "Title  required")]
        public string? Nurej { get; set; }
        public string? LegalProcesses { get; set; }
    }
}