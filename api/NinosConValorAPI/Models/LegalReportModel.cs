using System.ComponentModel.DataAnnotations;
namespace NinosConValorAPI.Models
{
    public class LegalReportModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public string? CourtNumber { get; set; }
        public string? Dna { get; set; }
        public string? Nurej { get; set; }
        public string? LegalProcesses { get; set; }
    }
}